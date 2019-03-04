import {searchParams, strToBool, strToInt} from './helpers';

const DEFAULTS = searchParams.parse(window.location.search, {
	'disable-filters': 'false',
	'disable-folders': 'false',
	'search-in-title': 'true',
	'search-in-description': 'true',
	'search-in-tags': 'true',
	'search-terms': '',
	'allowed-extensions': ['wcdf', 'xjpivot', 'adhoc|prpt', 'std', 'sta'],
	'date-min': '',
	'date-max': '',
	'date-property': 'created',
	'page-number': '0',
	'page-places': '5',
	'page-size': '24'
});

// Transform some string values to the correct type.
DEFAULTS['disable-filters'] = strToBool(DEFAULTS['disable-filters']);
DEFAULTS['disable-folders'] = strToBool(DEFAULTS['disable-folders']);
DEFAULTS['search-in-title'] = strToBool(DEFAULTS['search-in-title']);
DEFAULTS['search-in-description'] = strToBool(DEFAULTS['search-in-description']);
DEFAULTS['search-in-tags'] = strToBool(DEFAULTS['search-in-tags']);
DEFAULTS['page-number'] = strToInt(DEFAULTS['page-number']);
DEFAULTS['page-places'] = strToInt(DEFAULTS['page-places']);
DEFAULTS['page-size'] = strToInt(DEFAULTS['page-size']);

export default DEFAULTS;
