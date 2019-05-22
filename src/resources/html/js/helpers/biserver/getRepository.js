import getMetadata from './getMetadata';

export default async ({ locale = 'default', depth = -1 } = {}) => {
	document.body.classList.add('loading');

	const response = await getMetadata({ fullPath: '/' }, { locale, depth });

	document.body.classList.remove('loading');

	if (Array.isArray(response) && response.length === 1) {
		return response[0];
	}

	return null;
};
