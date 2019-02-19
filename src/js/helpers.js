export const isProduction = process.env.NODE_ENV === 'production';
export const toLocaleDateTime = str => {
	let date = new Date(str);
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
