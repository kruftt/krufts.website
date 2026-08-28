// The linear 3-step sequence for the sphere proof. Index === currentStep;
// STEP_COUNT means done.

export const STEP_CAPTIONS = [
	"Drag the ring outward to open the cone up against the wall of the cylinder. Every slice keeps the area it had, so the volume never changes.",
	"The hollow left behind is exactly half a sphere. Drop the sphere in to see it fit.",
	"A mirrored copy of the carved piece caps the cylinder off around the sphere.",
] as const;

export const STEP_COUNT = STEP_CAPTIONS.length;

export const DONE_CAPTION =
	"Each carved piece holds exactly one cone's worth of volume, so together they take up one third of the cylinder. The sphere fills the other two thirds.";
