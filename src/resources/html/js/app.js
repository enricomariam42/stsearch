import './vendor/bootstrap';
import './vendor/fontawesome';
import './vendor/fetch-polyfill';
import './vendor/formdata-polyfill';
import {noty} from './vendor/noty';

import '../css/app.scss';

import {isProduction} from './helpers';

import RemoteRepositoryAPI from './api/remote-repository-api';
import Repository from './repository';

import SearchContainerElement from './elements/search-container-element';

window.addEventListener('load', async () => {
	let repository = new Repository();
	let canAdminister = await RemoteRepositoryAPI.canAdminister();

	let container = document.querySelector('#main');
	let searchContainerElement = new SearchContainerElement(container, {
		pageNumber: 0,
		pagePlaces: 5,
		pageSize: 24,
		repository,
		canAdminister
	});

	let result = await repository.refresh();
	searchContainerElement.render();

	if (!result) {
		noty.error('Error in data loading');
	}

	if (!isProduction) {
		window.STSearch = {repository, canAdminister, searchContainerElement};
	}
});
