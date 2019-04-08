import './vendor/bootstrap';
import './vendor/fontawesome';
import './vendor/unfetch';
import {noty} from './vendor/noty';

import '../css/app.scss';

import {CONFIG, loadConfig} from './config';

import RemoteRepositoryAPI from './api/remote-repository-api';
import Repository from './repository';

import SearchContainerElement from './elements/search-container-element';

window.STSearch = {};

window.addEventListener('load', async () => {
	// Load config from presets.
	await loadConfig();

	let repository = new Repository();
	let container = document.querySelector('#main');

	let searchContainerElement = new SearchContainerElement(container, {repository});
	searchContainerElement.render();

	let root = await RemoteRepositoryAPI.getRepository();
	if (root === null) {
		noty.error('Error in data loading');
	} else {
		// The property "_root" is updated to avoid applying the filters twice.
		repository._root = root;

		let currentFolder = repository.fromPath(CONFIG['current-folder']);
		if (currentFolder === null) {
			repository.currentFolder = root;
			noty.error('Folder does not exist');
		} else {
			repository.currentFolder = currentFolder;
		}

		searchContainerElement.render();
	}

	window.STSearch.config = CONFIG;
	window.STSearch.repository = repository;
	window.STSearch.ref = searchContainerElement;
});
