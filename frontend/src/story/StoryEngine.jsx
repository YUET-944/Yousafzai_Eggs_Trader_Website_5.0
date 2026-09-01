import React, { createContext, useContext, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StoryContext = createContext();

export function useStoryEngine() {
  return useContext(StoryContext);
}

export default function StoryEngine({ children }) {
  const [activeScene, setActiveScene] = useState('hero');

  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
  }, []);

  return (
    <StoryContext.Provider value={{ activeScene, setActiveScene }}>
      {children}
    </StoryContext.Provider>
  );
}
