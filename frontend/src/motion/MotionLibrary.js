import gsap from 'gsap';

export const MotionLibrary = {
  // SCENE 1: Blueprint Draw
  blueprintDraw: (elements, onComplete) => {
    return gsap.fromTo(elements, 
      { autoAlpha: 0, drawSVG: "0%" }, 
      { duration: 1.5, autoAlpha: 1, drawSVG: "100%", ease: "power2.inOut", stagger: 0.1, onComplete }
    );
  },

  // SCENE 2: Elegant Reveal (Chairman)
  elegantReveal: (elements) => {
    return gsap.fromTo(elements,
      { autoAlpha: 0, y: 20 },
      { duration: 1.2, autoAlpha: 1, y: 0, ease: "power2.out", stagger: 0.15 }
    );
  },

  // SCENE 3 & 5: Infrastructure Expansion
  infrastructureExpand: (elements) => {
    return gsap.fromTo(elements,
      { autoAlpha: 0, scale: 0.95 },
      { duration: 1, autoAlpha: 1, scale: 1, ease: "power2.out", stagger: 0.2 }
    );
  },

  // SCENE 4: Precision Snap
  precisionSnap: (elements) => {
    return gsap.fromTo(elements,
      { autoAlpha: 0, scale: 1.05 },
      { duration: 0.6, autoAlpha: 1, scale: 1, ease: "back.out(1.2)", stagger: 0.1 }
    );
  },

  // SCENE 6: Network Branching
  networkBranch: (nodes, links) => {
    const tl = gsap.timeline();
    if(links) tl.fromTo(links, { scaleX: 0 }, { duration: 0.6, scaleX: 1, transformOrigin: "left center", ease: "power2.inOut", stagger: 0.05 });
    if(nodes) tl.fromTo(nodes, { autoAlpha: 0, scale: 0 }, { duration: 0.4, autoAlpha: 1, scale: 1, ease: "back.out(1.5)", stagger: 0.05 }, "-=0.3");
    return tl;
  },

  // SCENE 7: CTA Stillness
  finalPulse: (element) => {
    return gsap.to(element, {
      boxShadow: "0 0 30px 5px rgba(222, 81, 10, 0.4)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
};
