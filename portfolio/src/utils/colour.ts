
interface RGB { r: number; g: number; b: number; }
interface HSL { h: number; s: number; l: number; }

export const blackOrWhite = (colour: RGB): string => {
	const perceivedBrightness = (colour.r * 299 + colour.g * 587 + colour.b * 114) / 1000;
	return perceivedBrightness >= 128 ? "#1B1A1B" : "#FFFFFF";
};

export const pastelize = (colour: RGB, amount: number = 20): string => {
	const colourAsHSL = rgbToHSL(colour);
	colourAsHSL.l = Math.min(100, colourAsHSL.l + amount);
	return `hsl(${colourAsHSL.h}, ${colourAsHSL.s}%, ${colourAsHSL.l}%)`;
};

export const hexToRgb = (hex: string): RGB => {
	hex = hex.replace("#", "");

	return {
		r: parseInt(hex.substring(0, 2), 16),
		g: parseInt(hex.substring(2, 4), 16),
		b: parseInt(hex.substring(4, 6), 16)
	};
}

const rgbToHSL = (rgb: RGB): HSL => {
	const rNormalized = rgb.r / 255;
	const gNormalized = rgb.g / 255;
	const bNormalized = rgb.b / 255;

	const max = Math.max(rNormalized, gNormalized, bNormalized);
	const min = Math.min(rNormalized, gNormalized, bNormalized);
	let h = 0, s; const l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case rNormalized:
				h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
				break;
			case gNormalized:
				h = (bNormalized - rNormalized) / d + 2;
				break;
			case bNormalized:
				h = (rNormalized - gNormalized) / d + 4;
				break;
		}

		h /= 6;
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100)
	};
}


