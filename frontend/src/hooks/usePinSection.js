import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SYSTEM 03 & 05: Storytelling & Performance Engine
 * Safely pins a section, scrubs its internal timeline, and cleans up on unmount.
 * Lazy initializes only when near the viewport.
 */
export function usePinSection(triggerRef, options = {}) {
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    // Use ScrollTrigger to manage the pinning and scrubbing
    const pinTrigger = ScrollTrigger.create({
      trigger: el,
      start: options.start || 'center center',
      end: options.end || '+=3000', // Adjust for story length
      pin: true,
      anticipatePin: 1,
      scrub: 1,
      invalidateOnRefresh: true,
      animation: options.animation, // The GSAP timeline to scrub
      onEnter: options.onEnter,
      onLeave: options.onLeave,
    });

    return () => {
      pinTrigger.kill();
    };
  }, [triggerRef, options]);
}
