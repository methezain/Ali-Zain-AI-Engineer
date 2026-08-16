export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json; charset=utf-8',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
        status: 405,
        headers: corsHeaders,
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const message = String(body?.message || '').trim();
    const company = String(body?.company || '').trim();

    // Honeypot field for basic bot filtering.
    if (company) {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
    }

    const invalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !email || invalidEmail || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid input' }), {
        status: 422,
        headers: corsHeaders,
      });
    }

    const resendApiKey = env.RESEND_API_KEY;
    const to = env.CONTACT_TO || 'methealizain@gmail.com';
    const from = env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>';

    if (!resendApiKey) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing RESEND_API_KEY' }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const html = [
      '<h2 style="font-family:sans-serif">New portfolio enquiry</h2>',
      `<p style="font-family:sans-serif"><strong>Name:</strong> ${escapeHtml(name)}</p>`,
      `<p style="font-family:sans-serif"><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      '<p style="font-family:sans-serif"><strong>Message:</strong></p>',
      `<p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>`,
    ].join('');

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New contact from ${name}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      return new Response(
        JSON.stringify({ ok: false, error: 'Resend rejected request', status: resendRes.status, detail }),
        {
          status: 502,
          headers: corsHeaders,
        }
      );
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
  },
};

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
