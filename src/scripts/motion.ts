const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

const cleanups: Array<() => void> = [];

function observe(
  selector: string,
  onEnter: (el: HTMLElement) => void,
  rootMargin = '0px 0px -12% 0px'
): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!els.length) return;

  if (reduced() || !('IntersectionObserver' in window)) {
    els.forEach(onEnter);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        onEnter(entry.target as HTMLElement);
        io.unobserve(entry.target);
      }
    },
    { rootMargin, threshold: 0.1 }
  );

  els.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

function initReveals(): void {
  document.documentElement.classList.add('reveal-ready');

  observe('[data-reveal]', (el) => {
    const delay = Number(el.dataset.revealDelay ?? 0);
    if (delay) el.style.transitionDelay = `${delay}ms`;
    el.classList.add('is-visible');
  });
}

function initCounters(): void {
  if (!reduced()) {
    document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
      el.textContent = `${el.dataset.counterPrefix ?? ''}0${el.dataset.counterSuffix ?? ''}`;
    });
  }

  observe('[data-counter]', (el) => {
    const target = Number(el.dataset.counter ?? 0);
    const suffix = el.dataset.counterSuffix ?? '';
    const prefix = el.dataset.counterPrefix ?? '';
    const render = (v: number) => {
      el.textContent = `${prefix}${Math.round(v)}${suffix}`;
    };

    if (reduced()) {
      render(target);
      return;
    }

    const duration = 900;
    let start: number | null = null;
    const tick = (now: number) => {
      start ??= now;
      const t = Math.min(1, (now - start) / duration);
      render(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function initBars(): void {
  observe('[data-bar]', (el) => {
    el.style.setProperty('--bar-w', `${el.dataset.bar}%`);
  });
}

function initSheen(): void {
  if (matchMedia('(hover: none)').matches) return;
  if (!document.querySelector('.lift')) return;

  const STIFFNESS = 0.032;
  const DAMPING = 0.84;

  let px = -9999;
  let py = -9999;
  let lx = px;
  let ly = py;
  let vx = 0;
  let vy = 0;
  let active: HTMLElement | null = null;
  let raf: number | null = null;

  const tick = () => {
    vx = (vx + (px - lx) * STIFFNESS) * DAMPING;
    vy = (vy + (py - ly) * STIFFNESS) * DAMPING;
    lx += vx;
    ly += vy;

    if (active) {
      const r = active.getBoundingClientRect();
      active.style.setProperty('--mx', `${((lx - r.left) / r.width) * 100}%`);
      active.style.setProperty('--my', `${((ly - r.top) / r.height) * 100}%`);
    }

    const settled = Math.hypot(vx, vy) < 0.05 && Math.hypot(px - lx, py - ly) < 0.5;
    raf = active || !settled ? requestAnimationFrame(tick) : null;
  };

  const onMove = (e: PointerEvent) => {
    px = e.clientX;
    py = e.clientY;
    if (lx === -9999) {
      lx = px;
      ly = py;
    }
    const found = e.target instanceof Element ? e.target.closest('.lift') : null;
    active = found instanceof HTMLElement ? found : null;
    if (active && raf === null) raf = requestAnimationFrame(tick);
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  cleanups.push(() => {
    document.removeEventListener('pointermove', onMove);
    if (raf !== null) cancelAnimationFrame(raf);
  });
}

export function initMotion(): void {
  destroyMotion();
  initReveals();
  initCounters();
  initBars();
  initSheen();
}

export function destroyMotion(): void {
  while (cleanups.length) cleanups.pop()?.();
}
