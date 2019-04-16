import getFaUnicodeCharacter from './getUnicodeCharacter';
import {svgPathData} from './facToolCde';

export const prefix = 'fac';
export const iconName = 'file-wcdf';
export const width = 576;
export const height = 512;
export const ligatures = [];
export const unicode = getFaUnicodeCharacter();
export {svgPathData};

export const definition = {
	prefix,
	iconName,
	icon: [width, height, ligatures, unicode, svgPathData]
};

export {definition as faFileWcdf};
