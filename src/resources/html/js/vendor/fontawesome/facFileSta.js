import getFaUnicodeCharacter from './getUnicodeCharacter';
import { svgPathData } from './facToolStagile';

export const prefix = 'fac';
export const iconName = 'file-sta';
export const width = 1200;
export const height = 1200;
export const ligatures = [];
export const unicode = getFaUnicodeCharacter();
export { svgPathData };

export const definition = {
	prefix,
	iconName,
	icon: [width, height, ligatures, unicode, svgPathData]
};

export { definition as faFileSta };
