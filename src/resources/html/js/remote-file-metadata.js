import {objToSearchParams} from './helpers';

export const API_ENDPOINT = '../../../../plugin/file-metadata/api';
export const DEFAULT_LOCALE = 'default';
export const DEFAULT_SHOW_HIDDEN = 'auto';
export const DEFAULT_DEPTH = 1;

export default class RemoteFileMetadata {
	static async getMetadata(paths, {locale = DEFAULT_LOCALE, showHidden = DEFAULT_SHOW_HIDDEN, depth = DEFAULT_DEPTH} = {}) {
		if (!Array.isArray(paths)) {
			paths = [paths];
		}

		let url = `${API_ENDPOINT}/get?${objToSearchParams({locale, showHidden, depth})}`;
		let response = await fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(paths)
		});

		if (response.status === 200) {
			return response.json();
		}

		return null;
	}

	static async setMetadata(metadata, {locale = DEFAULT_LOCALE} = {}) {
		if (!Array.isArray(metadata)) {
			metadata = [metadata];
		}

		// Each entry must define properties.
		metadata.forEach(entry => {
			if (!('properties' in entry)) {
				entry.properties = {};
			}
		});

		let url = `${API_ENDPOINT}/set?${objToSearchParams({locale})}`;
		let response = await fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(metadata)
		});

		if (response.status === 200) {
			return response.json();
		}

		return null;
	}

	static async getRepository() {
		let response = await RemoteFileMetadata.getMetadata({fullPath: '/'}, {depth: -1});

		if (Array.isArray(response) && response.length === 1) {
			return response[0];
		}

		return null;
	}
}
