import './vendor/bootstrap';
import './vendor/fontawesome';
import './vendor/fetch-polyfill';
import './vendor/formdata-polyfill';
import {noty} from './vendor/noty';

import '../css/app.scss';

import {isProduction} from './helpers';
import Repository from './repository';
import SearchContainerElement from './elements/search-container-element';

window.addEventListener('load', async () => {
	let container = document.querySelector('#main');
	let repository = new Repository();
	let searchContainerElement = new SearchContainerElement(container, {
		pageNumber: 0,
		pagePlaces: 5,
		pageSize: 24,
		repository
	});

	let result = await repository.refresh();
	searchContainerElement.render();

	if (!result) {
		noty.error('Error in data loading');
	}

	if (!isProduction) {
		window.STSearch = {repository, searchContainerElement};
	}
});
