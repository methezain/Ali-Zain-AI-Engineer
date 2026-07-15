// Smooth scroll (Lenis) + scroll reveals + counters + magnetic buttons.
// GSAP/ScrollTrigger drives reveals; everything degrades with reduced motion.

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = () => matchMedia('(hover: none)').matches;

let lenis: Lenis | null = null;
let rafId: number | null = null;
const cleanups: Array<() => void> = [];

function initLenis(): void {
  if (prefersReduced()) return;

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  // In-page anchor smoothing.
  const onClick = (e: Event) => {
    const link = (e.target as Element)?.closest?.('a[href^="#"]');
    if (!(link instanceof HTMLAnchorElement)) return;
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      lenis?.scrollTo(target as HTMLElement, { offset: -80 });
    }
  };
  document.addEventListener('click', onClick);
  cleanups.push(() => document.removeEventListener('click', onClick));
}

function initReveals(): void {
  document.documentElement.classList.add('reveal-ready');
  const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');

  if (prefersReduced()) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  els.forEach((el) => {
    const delay = Number(el.dataset.revealDelay ?? 0);
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        if (delay) {
          el.style.transitionDelay = `${delay}ms`;
        }
        el.classList.add('is-visible');
      },
    });
    cleanups.push(() => st.kill());
  });
}

function initCounters(): void {
  const counters = gsap.utils.toArray<HTMLElement>('[data-counter]');
  counters.forEach((el) => {
    const target = Number(el.dataset.counter ?? 0);
    const suffix = el.dataset.counterSuffix ?? '';
    const decimals = Number(el.dataset.counterDecimals ?? 0);

    if (prefersReduced()) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals) + suffix;
          },
        });
      },
    });
    cleanups.push(() => st.kill());
  });
}

function initMagnetic(): void {
  if (prefersReduced() || isTouch()) return;
  const els = document.querySelectorAll<HTMLElement>('[data-magnetic]');
  els.forEach((el) => {
    const strength = Number(el.dataset.magnetic || 0.3);
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      gsap.to(el, {
        x: mx * strength,
        y: my * strength,
        duration: 0.4,
        ease: 'power3.out',
      });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    cleanups.push(() => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    });
  });
}

export function initMotion(): void {
  destroyMotion();
  initLenis();
  initReveals();
  initCounters();
  initMagnetic();
  ScrollTrigger.refresh();
}

export function destroyMotion(): void {
  while (cleanups.length) cleanups.pop()?.();
  ScrollTrigger.getAll().forEach((t) => t.kill());
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  lenis?.destroy();
  lenis = null;
}
