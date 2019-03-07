import {searchParams, override, strToBool, strToInt} from './helpers';

import RemoteRepositoryAPI from './api/remote-repository-api';

export const CONFIG = {};
export const PRESETS = {};

export const loadConfig = async () => {
	let response = await fetch('./presets.json', {
		method: 'GET',
		headers: {'Content-Type': 'application/json'}
	});

	if (response.status === 200) {
		override(PRESETS, await response.json());

		let paramsConfig = searchParams.parse(window.location.search, {preset: 'default'});
		override(CONFIG, PRESETS[paramsConfig.preset], paramsConfig);

		// Transform some string values to the correct type.
		CONFIG['enable-banner'] = strToBool(CONFIG['enable-banner']);
		CONFIG['enable-filters'] = strToBool(CONFIG['enable-filters']);
		CONFIG['enable-folders'] = strToBool(CONFIG['enable-folders']);
		CONFIG['enable-file-tags'] = strToBool(CONFIG['enable-file-tags']);
		CONFIG['enable-file-edit'] = strToBool(CONFIG['enable-file-edit']);
		CONFIG['enable-file-home'] = strToBool(CONFIG['enable-file-home']);
		CONFIG['enable-file-favorite'] = strToBool(CONFIG['enable-file-favorite']);
		CONFIG['enable-file-open'] = strToBool(CONFIG['enable-file-open']);
		CONFIG['search-in-title'] = strToBool(CONFIG['search-in-title']);
		CONFIG['search-in-description'] = strToBool(CONFIG['search-in-description']);
		CONFIG['search-in-tags'] = strToBool(CONFIG['search-in-tags']);
		CONFIG['max-tags'] = strToInt(CONFIG['max-tags']);
		CONFIG['page-places'] = strToInt(CONFIG['page-places']);
		CONFIG['page-size'] = strToInt(CONFIG['page-size']);

		// If "enable-file-home" is true, check if the user really has permission.
		if (CONFIG['enable-file-home']) {
			let canAdminister = await RemoteRepositoryAPI.canAdminister();
			CONFIG['enable-file-home'] = canAdminister;
		}
	}
};
