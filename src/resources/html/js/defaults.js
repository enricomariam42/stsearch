import {searchParams, override, strToBool, strToInt} from './helpers';

export const DEFAULTS = {};
export const PRESETS = {};

export const loadDefaults = async () => {
	let response = await fetch('./presets.json', {
		method: 'GET',
		headers: {'Content-Type': 'application/json'}
	});

	if (response.status === 200) {
		override(PRESETS, await response.json());

		let paramsDefaults = searchParams.parse(window.location.search, {preset: 'default'});
		override(DEFAULTS, PRESETS[paramsDefaults.preset], paramsDefaults);

		// Transform some string values to the correct type.
		DEFAULTS['disable-banner'] = strToBool(DEFAULTS['disable-banner']);
		DEFAULTS['disable-filters'] = strToBool(DEFAULTS['disable-filters']);
		DEFAULTS['disable-folders'] = strToBool(DEFAULTS['disable-folders']);
		DEFAULTS['search-in-title'] = strToBool(DEFAULTS['search-in-title']);
		DEFAULTS['search-in-description'] = strToBool(DEFAULTS['search-in-description']);
		DEFAULTS['search-in-tags'] = strToBool(DEFAULTS['search-in-tags']);
		DEFAULTS['page-number'] = strToInt(DEFAULTS['page-number']);
		DEFAULTS['page-places'] = strToInt(DEFAULTS['page-places']);
		DEFAULTS['page-size'] = strToInt(DEFAULTS['page-size']);
	}
};
