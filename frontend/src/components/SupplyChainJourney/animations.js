import * as THREE from 'three';

// Helper to linearly interpolate between two values
export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

// Maps a global progress (0 to 1) into a local range (0 to 1)
export function getLocalProgress(globalProgress, rangeStart, rangeEnd) {
  if (globalProgress <= rangeStart) return 0;
  if (globalProgress >= rangeEnd) return 1;
  return (globalProgress - rangeStart) / (rangeEnd - rangeStart);
}

// Dampens a value smoothly towards a target
export function damp(current, target, lambda, delta) {
  return THREE.MathUtils.damp(current, target, lambda, delta);
}
