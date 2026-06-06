// Shared motion language for the interactive diagrams.
// Exponential ease-out curves only (no bounce/elastic), per craft guidelines.

export const easeOutQuint = [0.22, 1, 0.36, 1] as const;
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.77, 0, 0.175, 1] as const;

export const spring = {
	type: 'spring' as const,
	stiffness: 120,
	damping: 18,
	mass: 0.6,
};
