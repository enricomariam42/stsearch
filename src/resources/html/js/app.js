import './vendor/bootstrap';
import './vendor/fontawesome';
import './vendor/formdata-polyfill';

import '../css/app.scss';

import SearchContainerElement from './elements/search-container-element';
import Repository from './repository';

window.addEventListener('load', () => {
	let repository = new Repository(require('./repository-sample.json')[0]);
	window.repository = repository;

	window.searchContainerElement = new SearchContainerElement(document.body, {
		pageNumber: 0,
		pagePlaces: 5,
		pageSize: 24,
		repository
	});
});
