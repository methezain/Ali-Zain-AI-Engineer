<?php
/**
 * Contact form handler for InfinityFree (static + PHP hosting).
 *
 * The site is a static Astro build; this PHP file is the only server-side piece.
 * It receives the contact form POST, validates it, and sends the message to
 * methealizain@gmail.com through the Resend HTTP API.
 *
 * Diagnostics:
 *   GET  /api/contact.php?selftest=1  -> checks outbound connectivity to Resend
 *                                        (sends NO email). Use this to confirm the
 *                                        host allows outgoing HTTPS.
 *   POST /api/contact.php             -> normal form submit. On failure it returns
 *                                        the real cURL / Resend error for debugging.
 *
 * Security note: the API key lives here server-side and is never sent to the
 * browser. If this project ever goes into a public git repo, move the key out
 * (or rotate it at https://resend.com/api-keys).
 */

header('Content-Type: application/json; charset=utf-8');

// ---- Config -----------------------------------------------------------------
$RESEND_API_KEY = getenv('RESEND_API_KEY') ?: 're_XAjVux5p_2QWYeyJb5c8TGk6YLXDhHYed';
$TO            = 'methealizain@gmail.com';
// Use a verified domain sender once you have one; onboarding@resend.dev works for testing.
$FROM          = 'Portfolio Contact <onboarding@resend.dev>';
$UA            = 'PortfolioContact/1.0';
// -----------------------------------------------------------------------------

function respond(int $code, array $body): void {
  http_response_code($code);
  echo json_encode($body);
  exit;
}

// ---- Connectivity self-test (no email sent) --------------------------------
// Visit https://your-site/api/contact.php?selftest=1 in a browser.
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['selftest'])) {
  if (!function_exists('curl_init')) {
    respond(200, ['curl' => false, 'note' => 'The cURL PHP extension is not available on this host.']);
  }
  $ch = curl_init('https://api.resend.com/');
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_NOBODY         => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_USERAGENT      => $UA,
  ]);
  curl_exec($ch);
  $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $errno  = curl_errno($ch);
  $err    = curl_error($ch);
  curl_close($ch);
  respond(200, [
    'curl'      => true,
    'reachable' => ($errno === 0),
    'httpStatus' => $status,
    'curlErrno' => $errno,
    'curlError' => $err,
    'hint'      => $errno === 0
      ? 'Outbound HTTPS works — the form should send.'
      : 'Outbound HTTPS is blocked or failing on this host (see curlError).',
  ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

if (!function_exists('curl_init')) {
  respond(500, ['ok' => false, 'error' => 'cURL is not available on this host']);
}

// Accept JSON (from fetch) or form-encoded fallback.
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  $data = $_POST;
}

$name    = trim($data['name'] ?? '');
$email   = trim($data['email'] ?? '');
$message = trim($data['message'] ?? '');
$hp      = trim($data['company'] ?? ''); // honeypot

// Bots fill the hidden honeypot — pretend success and drop it.
if ($hp !== '') {
  respond(200, ['ok' => true]);
}

$fields = [];
if ($name === '')                                                $fields[] = 'name';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $fields[] = 'email';
if ($message === '')                                             $fields[] = 'message';
if ($fields) {
  respond(422, ['ok' => false, 'error' => 'Invalid input', 'fields' => $fields]);
}

// Build the email body (escape everything the user typed).
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeMail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeMsg  = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$html =
  '<h2 style="font-family:sans-serif">New portfolio enquiry</h2>' .
  '<p style="font-family:sans-serif"><strong>Name:</strong> ' . $safeName . '</p>' .
  '<p style="font-family:sans-serif"><strong>Email:</strong> ' . $safeMail . '</p>' .
  '<p style="font-family:sans-serif"><strong>Message:</strong></p>' .
  '<p style="font-family:sans-serif;white-space:pre-wrap">' . $safeMsg . '</p>';

$payload = json_encode([
  'from'     => $FROM,
  'to'       => [$TO],
  'reply_to' => $email,
  'subject'  => 'New contact from ' . $name,
  'html'     => $html,
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => $payload,
  CURLOPT_USERAGENT      => $UA,
  CURLOPT_HTTPHEADER     => [
    'Authorization: Bearer ' . $RESEND_API_KEY,
    'Content-Type: application/json',
  ],
  CURLOPT_TIMEOUT        => 20,
]);
$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$errno    = curl_errno($ch);
$curlErr  = curl_error($ch);
curl_close($ch);

// Network / connection failure (most likely cause if the host blocks outbound).
if ($errno !== 0) {
  respond(502, ['ok' => false, 'error' => 'network', 'curlErrno' => $errno, 'curlError' => $curlErr]);
}
if ($status >= 200 && $status < 300) {
  respond(200, ['ok' => true]);
}
// Resend rejected it — surface its message so we can see why.
respond(502, ['ok' => false, 'error' => 'resend', 'httpStatus' => $status, 'detail' => substr((string) $response, 0, 400)]);
