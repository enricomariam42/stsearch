import './vendor/bootstrap';
import './vendor/fontawesome';
import './vendor/formdata-polyfill';

import '../css/app.scss';

import {isProduction} from './helpers';
import Repository from './repository';
import SearchContainerElement from './elements/search-container-element';

window.addEventListener('load', async () => {
	let repository = new Repository();
	let searchContainerElement = new SearchContainerElement(document.body, {
		pageNumber: 0,
		pagePlaces: 5,
		pageSize: 24,
		repository
	});

	await repository.refresh();
	searchContainerElement.render();

	if (!isProduction) {
		window.STSearch = {repository, searchContainerElement};
	}
});
