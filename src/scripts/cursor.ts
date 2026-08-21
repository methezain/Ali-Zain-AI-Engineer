const INTERACTIVE = 'a, button, summary, input, textarea, select, label, [role="button"]';

let teardown: (() => void) | null = null;

export function initCursor(): void {
  destroyCursor();

  if (matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ring = document.getElementById('cursor-ring');
  const dot = document.getElementById('cursor-dot');
  if (!(ring instanceof HTMLElement) || !(dot instanceof HTMLElement)) return;

  let px = window.innerWidth / 2;
  let py = window.innerHeight / 2;
  let rx = px;
  let ry = py;
  let dx = px;
  let dy = py;
  let lastX = px;
  let lastY = py;
  let raf: number | null = null;
  let shown = false;
  const ringEase = 0.14;
  const dotEase = 0.42;

  const onMove = (e: PointerEvent) => {
    px = e.clientX;
    py = e.clientY;
    if (!shown) {
      shown = true;
      document.body.classList.add('has-cursor');
    }
    const el = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
    ring.classList.toggle('is-active', !!el);
    dot.classList.toggle('is-active', !!el);
  };

  const frame = () => {
    rx += (px - rx) * ringEase;
    ry += (py - ry) * ringEase;
    dx += (px - dx) * dotEase;
    dy += (py - dy) * dotEase;

    const vx = rx - lastX;
    const vy = ry - lastY;
    lastX = rx;
    lastY = ry;

    const speed = Math.min(Math.hypot(vx, vy), 48);
    const stretch = speed / 48;
    const angle = (Math.atan2(vy, vx) * 180) / Math.PI;

    ring.style.transform =
      `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)` +
      ` rotate(${angle}deg) scale(${(1 + stretch * 1.25).toFixed(3)}, ${(1 - stretch * 0.5).toFixed(3)})`;
    dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;

    raf = requestAnimationFrame(frame);
  };

  const onOut = (e: PointerEvent) => {
    if (e.relatedTarget === null) document.body.classList.remove('has-cursor');
  };
  const onOver = () => {
    if (shown) document.body.classList.add('has-cursor');
  };
  const onDown = () => ring.classList.add('is-down');
  const onUp = () => ring.classList.remove('is-down');

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerout', onOut);
  window.addEventListener('pointerover', onOver);
  window.addEventListener('pointerdown', onDown);
  window.addEventListener('pointerup', onUp);
  raf = requestAnimationFrame(frame);

  teardown = () => {
    if (raf !== null) cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerout', onOut);
    window.removeEventListener('pointerover', onOver);
    window.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointerup', onUp);
    document.body.classList.remove('has-cursor');
  };
}

export function destroyCursor(): void {
  teardown?.();
  teardown = null;
}
