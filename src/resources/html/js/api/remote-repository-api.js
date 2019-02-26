import {objToSearchParams} from '../helpers';

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

		let url = `${FILES_METADATA_API_ENDPOINT}/get?${objToSearchParams({locale, showHidden, depth})}`;
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

		let url = `${FILES_METADATA_API_ENDPOINT}/set?${objToSearchParams({locale})}`;
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
			return (await response.text() === 'true');
		}

		return false;
	}
}
