import {objToSearchParams} from './helpers';

export const API_ENDPOINT = '../../../../plugin/file-metadata/api';

export default class RemoteFileMetadata {
	static getMetadata(path, {locale = 'default', showHidden = 'auto', depth = 1} = {}) {
		return fetch(`${API_ENDPOINT}/get?${objToSearchParams({locale, showHidden, depth})}`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(Array.isArray(path) ? path : [path])
		})
			.then(response => response.status === 200
				? response.json()
				: null
			);
	}

	static setMetadata(metadata, {locale = 'default'} = {}) {
		return fetch(`${API_ENDPOINT}/set?${objToSearchParams({locale})}`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(Array.isArray(metadata) ? metadata : [metadata])
		})
			.then(response => response.status === 200
				? response.json()
				: null
			);
	}

	static getRepository() {
		return RemoteFileMetadata.getMetadata('/', {depth: -1})
			.then(response => Array.isArray(response)
				? response[0]
				: null
			);
	}
}
