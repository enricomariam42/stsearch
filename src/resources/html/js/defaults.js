import {searchParams} from './helpers';

const DEFAULTS = searchParams.parse(window.location.search, {
	'search-in-title': 'true',
	'search-in-description': 'true',
	'search-in-tags': 'true',
	'search-terms': '',
	'allowed-extensions': ['wcdf', 'xjpivot', 'adhoc|prpt', 'std', 'sta'],
	'date-min': '',
	'date-max': '',
	'date-property': 'created'
});

// Transform some string values to the correct type.
DEFAULTS['search-in-title'] = DEFAULTS['search-in-title'] === 'true';
DEFAULTS['search-in-description'] = DEFAULTS['search-in-description'] === 'true';
DEFAULTS['search-in-tags'] = DEFAULTS['search-in-tags'] === 'true';

export default DEFAULTS;
