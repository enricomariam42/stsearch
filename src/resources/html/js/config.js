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
		CONFIG['search-in-title'] = strToBool(CONFIG['search-in-title']);
		CONFIG['search-in-description'] = strToBool(CONFIG['search-in-description']);
		CONFIG['search-in-tags'] = strToBool(CONFIG['search-in-tags']);
		CONFIG['page-places'] = strToInt(CONFIG['page-places']);
		CONFIG['page-size'] = strToInt(CONFIG['page-size']);
		CONFIG['show-file-edit-button'] = strToBool(CONFIG['show-file-edit-button']);
		CONFIG['show-file-home-button'] = strToBool(CONFIG['show-file-home-button']);
		CONFIG['show-file-favorite-button'] = strToBool(CONFIG['show-file-favorite-button']);
		CONFIG['show-file-open-button'] = strToBool(CONFIG['show-file-open-button']);

		// If "show-file-home-button" is true, check if the user really has permission.
		if (CONFIG['show-file-home-button']) {
			let canAdminister = await RemoteRepositoryAPI.canAdminister();
			CONFIG['show-file-home-button'] = canAdminister;
		}
	}
};
