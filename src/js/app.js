import './vendor/bootstrap';
import './vendor/date-input-polyfill';
import './vendor/fontawesome';

import '../css/app.scss';

import SearchContainerElement from './elements/search-container-element';

window.addEventListener('load', () => {
	// Register Service Worker.
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('sw.js').then(() => {
			console.log('SW registered');
		}).catch(error => {
			console.error('SW registration failed:', error);
		});
	}

	let demoItems = [];
	for (let i = 0; i < 1000; i++) {
		demoItems.push({
			title: `Top Customers (${i})`,
			text: 'View the top customers for sales and volume of units sold, quickly filter by region and product line.',
			thumbnail: 'https://via.placeholder.com/256',
			tags: [{name: 'Tag-1'}, {name: 'Tag-2'}, {name: 'Tag-3'}, {name: 'Tag-4'}]
		});
	}

	window.searchContainerElement = new SearchContainerElement(document.body, {
		pageNumber: 0,
		pagePlaces: 5,
		pageSize: 24,
		items: demoItems
	});
});
