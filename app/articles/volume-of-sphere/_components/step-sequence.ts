// The linear 4-step proof sequence. Index === currentStep; STEP_COUNT means done.

export const STEP_CAPTIONS = [
  "Drag the edge outward to transform the cone into a pyramid with the same base area.",
	"Next, drag the apex to one of the corners of the cube to shift the pyramid against the edge.",
	"Now place a copy of the pyramid to start filling the remaining space.",
	"Another copy completes the cube.",
] as const;

export const STEP_COUNT = STEP_CAPTIONS.length;

export const DONE_CAPTION =
	"Three identical pyramids fill the cube, and each pyramid has the same volume as the original cone. Therefore, the cone must have taken up one third of the cylinder.";

// Fade-out / fade-in duration for step transitions (ms). The step advance is
// held this long so the outgoing handle fades before the next one fades in.
export const FADE_MS = 500;
