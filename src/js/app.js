import './vendor/bootstrap';
import './vendor/date-input-polyfill';
import './vendor/fontawesome';

import '../css/app.scss';

import SearchContainerElement from './elements/search-container-element';
import Repository from './repository';

window.addEventListener('load', () => {
	// Register Service Worker.
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('sw.js').then(() => {
			console.log('SW registered');
		}).catch(error => {
			console.error('SW registration failed:', error);
		});
	}

	let repository = new Repository(require('./repository-sample.json')[0]);
	window.repository = repository;

	window.searchContainerElement = new SearchContainerElement(document.body, {
		pageNumber: 0,
		pagePlaces: 5,
		pageSize: 24,
		repository
	});
});
