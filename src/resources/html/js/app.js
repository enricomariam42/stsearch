import './vendor/bootstrap';
import './vendor/fontawesome';
import './vendor/unfetch';
import {noty} from './vendor/noty';

import '../css/app.scss';

import {isProduction} from './helpers';

import DEFAULTS from './defaults';

import RemoteRepositoryAPI from './api/remote-repository-api';
import Repository from './repository';

import SearchContainerElement from './elements/search-container-element';

window.addEventListener('load', async () => {
	let repository = new Repository();

	let container = document.querySelector('#main');
	let searchContainerElement = new SearchContainerElement(container, {
		disableFilters: DEFAULTS['disable-filters'],
		disableFolders: DEFAULTS['disable-folders'],
		pageNumber: DEFAULTS['page-number'],
		pagePlaces: DEFAULTS['page-places'],
		pageSize: DEFAULTS['page-size'],
		canAdminister: false,
		repository
	});
	searchContainerElement.render();

	let canAdminister = await RemoteRepositoryAPI.canAdminister();
	searchContainerElement.options.canAdminister = canAdminister;

	let result = await repository.refresh();
	searchContainerElement.render();

	if (!result) {
		noty.error('Error in data loading');
	}

	if (!isProduction) {
		window.STSearch = {DEFAULTS, repository, searchContainerElement};
	}
});
