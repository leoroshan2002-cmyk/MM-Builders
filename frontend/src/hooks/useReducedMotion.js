import { useState } from 'react';

const QUERY = '(prefers-reduced-motion:reduce)';

/** Non-hook version for plain JS modules. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(QUERY).matches;

/** true when the visitor asked their device to reduce animation. */
export default function useReducedMotion() {
  const [reduced] = useState(prefersReducedMotion);
  return reduced;
}
