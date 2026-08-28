// The linear 2-step sequence for the paraboloid proof. Index === currentStep;
// STEP_COUNT means done.

export const STEP_CAPTIONS = [
	"Drag the ring at the apex out to the wall of the cylinder. Every slice keeps the area it had, so the volume never changes.",
	"The hollow left behind is the same paraboloid stood on its head. Drop it in to fill the cylinder.",
] as const;

export const STEP_COUNT = STEP_CAPTIONS.length;

export const DONE_CAPTION =
	"The piece you reshaped and the piece you dropped in are the same shape, and together they fill the cylinder. So a paraboloid takes up exactly half of it.";
