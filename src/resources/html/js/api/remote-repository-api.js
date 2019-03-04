import cloneDeep from 'lodash/cloneDeep';

import {searchParams, strToBool, safeJSON} from '../helpers';

export const FILES_API_ENDPOINT = '../../../../api/repo/files';
export const FILES_METADATA_API_ENDPOINT = '../../../../plugin/file-metadata/api';

export const DEFAULT_LOCALE = 'default';
export const DEFAULT_SHOW_HIDDEN = 'auto';
export const DEFAULT_DEPTH = 1;

export default class RemoteRepositoryAPI {
	static async getMetadata(paths, {locale = DEFAULT_LOCALE, showHidden = DEFAULT_SHOW_HIDDEN, depth = DEFAULT_DEPTH} = {}) {
		if (!Array.isArray(paths)) {
			paths = [paths];
		}

		let url = `${FILES_METADATA_API_ENDPOINT}/get?${searchParams.stringify({locale, showHidden, depth})}`;
		let response = await fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(paths)
		});

		if (response.status === 200) {
			let metadata = await response.json();

			// Transform "metadata" object.
			(function transform(children) {
				children.forEach(child => {
					// "properties.tags" must be converted to array.
					if (typeof child.properties.tags !== 'undefined') {
						child.properties.tags = safeJSON.parse(child.properties.tags, []);
					}

					if (child.children) {
						transform(child.children);
					}
				});
			})(metadata);

			return metadata;
		}

		return null;
	}

	static async setMetadata(metadata, {locale = DEFAULT_LOCALE} = {}) {
		if (!Array.isArray(metadata)) {
			metadata = [metadata];
		}

		// Clone "metadata" object to avoid mutating the original.
		metadata = cloneDeep(metadata);

		// Transform "metadata" object.
		metadata.forEach(child => {
			// "properties" must be defined.
			if (typeof child.properties === 'undefined') {
				child.properties = {};
			// "properties.tags" must be converted to string.
			} else if (Array.isArray(child.properties.tags)) {
				child.properties.tags = safeJSON.stringify(child.properties.tags, '[]');
			}
		});

		let url = `${FILES_METADATA_API_ENDPOINT}/set?${searchParams.stringify({locale})}`;
		let response = await fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(metadata)
		});

		if (response.status === 200) {
			let result = await response.json();

			return result;
		}

		return null;
	}

	static async getRepository() {
		let response = await RemoteRepositoryAPI.getMetadata({fullPath: '/'}, {depth: -1});

		if (Array.isArray(response) && response.length === 1) {
			return response[0];
		}

		return null;
	}

	static async canAdminister() {
		let url = `${FILES_API_ENDPOINT}/canAdminister`;
		let response = await fetch(url, {
			method: 'GET',
			headers: {'Content-Type': 'text/plain'}
		});

		if (response.status === 200) {
			return strToBool(await response.text());
		}

		return false;
	}
}
