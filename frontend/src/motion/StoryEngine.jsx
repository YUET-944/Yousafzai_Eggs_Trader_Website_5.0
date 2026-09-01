import React, { createContext, useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StoryContext = createContext(null);

/**
 * SYSTEM 01 & 03: Motion & Storytelling Engine
 * Coordinates chapter progression, global timelines, and ambient motion.
 * Wraps the entire application to provide a unified animation state.
 */
export function StoryProvider({ children }) {
  const masterTimeline = useRef(gsap.timeline());

  useEffect(() => {
    const timeline = masterTimeline.current;
    // Refresh ScrollTrigger periodically to ensure pinning works on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      timeline.kill();
    };
  }, []);

  const value = {
    masterTimeline: masterTimeline.current,
  };

  return (
    <StoryContext.Provider value={value}>
      {children}
    </StoryContext.Provider>
  );
}

export function useStoryEngine() {
  return useContext(StoryContext);
}
