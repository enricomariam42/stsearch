import fetch from 'unfetch';

import getContextPath from './getContextPath';
import safeJSON from '../safeJSON';
import searchParams from '../searchParams';

export default async (paths, {locale = 'default', depth = 1} = {}) => {
	if (!Array.isArray(paths)) {
		/* eslint-disable-next-line no-param-reassign */
		paths = [paths];
	}

	if (/^en(?:_[A-Z]{2})?$/.test(locale)) {
		/* eslint-disable-next-line no-param-reassign */
		locale = 'default';
	}

	const contextPath = await getContextPath();
	const endpoint = `${contextPath}plugin/file-metadata/api/get?${searchParams.stringify(
		{locale, depth}
	)}`;
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(paths)
	});

	if (response.status === 200) {
		const metadata = await response.json();

		// Transform "metadata" object.
		(function transform(children) {
			children.forEach(child => {
				if (child.isFolder) {
					transform(child.children);
				} else if (typeof child.properties.tags !== 'undefined') {
					// "properties.tags" must be converted to array.
					child.properties.tags = safeJSON.parse(child.properties.tags, []);
				}
			});
		})(metadata);

		return metadata;
	}

	return null;
};