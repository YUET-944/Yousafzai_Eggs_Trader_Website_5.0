import React, { useRef } from 'react';

/**
 * SYSTEM 02: Visual Environment
 * This wrapper guarantees one continuous digital ecosystem for the entire website.
 * It prevents the user from feeling like they are scrolling through separate sections.
 */
export default function GlobalEnvironment({ children }) {
  const envRef = useRef(null);

  return (
    <div ref={envRef} className="global-environment">
      {/* 1. Deep corporate background */}
      <div className="bg-base" />

      {/* 2. One continuous blueprint grid */}
      <div className="blueprint-grid" />

      {/* 3. Soft ambient lighting that responds to scroll later */}
      <div className="ambient-glow" />

      {/* 4. Page content (Chapters) */}
      <main className="story-content">
        {children}
      </main>
    </div>
  );
}
