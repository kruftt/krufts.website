// Cross-cutting tuning shared by every proof scene in this article.

// Fade-out / fade-in duration for step transitions (ms). The step advance is
// held this long so the outgoing handle fades before the next one fades in.
export const FADE_MS = 500;

// Morph progress that locks a step.
export const COMMIT = 0.985;

// How close to the seat counts as "dropped in".
export const SEAT_EPS = 0.03;

/** Clamps a number to [0, 1]. */
export function clamp01(x: number) {
	return Math.min(1, Math.max(0, x));
}
