import cloneDeep from 'lodash/cloneDeep';
import fetch from 'unfetch';

import getContextPath from './getContextPath';
import safeJSON from '../safeJSON';
import searchParams from '../searchParams';

export default async (metadata, {locale = 'default'} = {}) => {
	if (!Array.isArray(metadata)) {
		/* eslint-disable-next-line no-param-reassign */
		metadata = [metadata];
	}

	if (/^en(?:_[A-Z]{2})?$/.test(locale)) {
		/* eslint-disable-next-line no-param-reassign */
		locale = 'default';
	}

	// Clone "metadata" object to avoid mutating the original.
	/* eslint-disable-next-line no-param-reassign */
	metadata = cloneDeep(metadata);

	// Transform "metadata" object.
	for await (const child of metadata) {
		// "properties" must be defined.
		if (typeof child.properties === 'undefined') {
			child.properties = {};
		}

		// "properties.tags" must be converted to string.
		if (Array.isArray(child.properties.tags)) {
			const strTags = safeJSON.stringify(child.properties.tags, '[]');
			child.properties.tags = strTags;
		}
	}

	const contextPath = await getContextPath();
	const endpoint = `${contextPath}plugin/file-metadata/api/set?${searchParams.stringify(
		{locale}
	)}`;
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(metadata)
	});

	if (response.status === 200) {
		return response.json();
	}

	return null;
};
