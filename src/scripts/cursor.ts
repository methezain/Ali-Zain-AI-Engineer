// Fluid cursor dot — trails the pointer and deforms toward motion direction.
// Re-init on every Astro page load (survives View Transitions).

let rafId: number | null = null;
const listeners: Array<() => void> = [];

export function initCursor(): void {
  // Tear down any previous instance first.
  destroyCursor();

  const dot = document.getElementById('cursor');
  if (!dot) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (matchMedia('(hover: none)').matches) return;

  let tx = innerWidth / 2;
  let ty = innerHeight / 2;
  let x = tx;
  let y = ty;
  let px = x;
  let py = y;
  const ease = 0.1; // lower = more trailing/lag = more fluid feel

  const move = (cx: number, cy: number) => {
    tx = cx;
    ty = cy;
  };

  const onMouse = (e: MouseEvent) => move(e.clientX, e.clientY);
  const onTouch = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) move(t.clientX, t.clientY);
  };

  addEventListener('mousemove', onMouse);
  addEventListener('touchmove', onTouch, { passive: true });
  listeners.push(() => removeEventListener('mousemove', onMouse));
  listeners.push(() => removeEventListener('touchmove', onTouch));

  // Contextual morph on interactive elements.
  const hoverTargets = 'a, button, [data-cursor="view"]';
  const onOver = (e: Event) => {
    const el = (e.target as Element)?.closest?.(hoverTargets);
    if (el) dot.classList.add('is-hovering');
  };
  const onOut = (e: Event) => {
    const el = (e.target as Element)?.closest?.(hoverTargets);
    if (el) dot.classList.remove('is-hovering');
  };
  document.addEventListener('mouseover', onOver);
  document.addEventListener('mouseout', onOut);
  listeners.push(() => document.removeEventListener('mouseover', onOver));
  listeners.push(() => document.removeEventListener('mouseout', onOut));

  const raf = () => {
    x += (tx - x) * ease;
    y += (ty - y) * ease;
    const vx = x - px;
    const vy = y - py;
    const speed = Math.min(Math.hypot(vx, vy), 48);
    const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
    const stretch = speed / 48; // 0..1, ramps up faster now
    const sx = 1 + stretch * 1.35; // elongate strongly along motion
    const sy = 1 - stretch * 0.55; // squash more perpendicular
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg) scale(${sx.toFixed(
      3
    )}, ${sy.toFixed(3)})`;
    px = x;
    py = y;
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
}

export function destroyCursor(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  while (listeners.length) {
    const off = listeners.pop();
    off?.();
  }
}
