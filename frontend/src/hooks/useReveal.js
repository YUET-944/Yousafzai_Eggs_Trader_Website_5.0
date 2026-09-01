import { useEffect, useRef } from 'react';

export function useReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    el.querySelectorAll('.reveal, .reveal-stagger, .reveal-up, .et-reveal, .et-banner-reveal').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export function useAnimateOnScroll(threshold = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export function useProgressBar(threshold = 0.3) {
  const wrapRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fill.style.width = '100%';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [threshold]);

  return { wrapRef, fillRef };
}
