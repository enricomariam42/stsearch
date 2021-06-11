import getFaUnicodeCharacter from './getUnicodeCharacter';

export const prefix = 'fac';
export const iconName = 'tool-streport';
export const width = 1200;
export const height = 1200;
export const ligatures = [];
export const unicode = getFaUnicodeCharacter();
export const svgPathData = 'm 341.48739,546.04971 c 163.70004,-0.65473 327.40008,-0.65473 491.03498,0 0.91161,46.22436 0.78138,92.51418 0.0651,138.73849 -163.70001,0.78565 -327.46517,0.65475 -491.16521,0.0657 -0.19534,-46.28977 -0.45581,-92.51411 0.0651,-138.80394 z M 97.890775,273.41771 c 171.839475,-0.19643 343.809165,-3.40464 515.583515,0.39285 0.65116,45.56962 0.65116,91.20471 0.0651,136.77433 -126.25871,2.55347 -252.64764,1.11304 -378.97146,1.24399 -0.13023,217.43778 0.26046,434.87546 -0.19535,652.24782 298.48886,-0.1964 569.27312,0.4413 867.69682,0.8349 0.1303,45.3077 0,89.79 0.1303,135.0884 L 98.216352,1199.6724 C 97.304737,890.89908 98.021006,582.12566 97.890775,273.41771 Z m 0,-273.417696583432 649.721155,0 C 836.36418,4.1903228 925.8327,36.534273 989.58064,100.30555 1062.2494,170.8206 1099.5605,272.6975 1102.2302,373.0685 c -0.065,194.26013 0.1302,388.52024 -0.065,582.78033 -171.96967,0.0657 -343.87425,0.1963 -515.84392,-0.0657 -0.19534,-45.76604 -0.26046,-91.46662 0.0651,-137.16714 126.32382,-0.45825 252.71272,0 379.03654,-0.26195 0.19535,-144.10739 0,-288.14924 0.13023,-432.2566 -0.8465,-78.83019 -31.51584,-163.16016 -99.10559,-208.20599 -44.66915,-32.14753 -100.92883,-40.26626 -154.45363,-40.46268 -204.65761,0 -409.31522,0.32734 -613.972844,-0.13098 C 97.630314,91.53209 97.890775,45.766049 97.890775,1.3416568e-5 Z';
export const definition = {
	prefix,
	iconName,
	icon: [width, height, ligatures, unicode, svgPathData],
};

export { definition as faToolStreport };
