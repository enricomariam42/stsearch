import './vendor/bootstrap';
import './vendor/fontawesome';
import './vendor/unfetch';
import {noty} from './vendor/noty';

import '../css/app.scss';

import {isProduction} from './helpers';

import {CONFIG, loadConfig} from './config';

import RemoteRepositoryAPI from './api/remote-repository-api';
import Repository from './repository';

import SearchContainerElement from './elements/search-container-element';

window.addEventListener('load', async () => {
	// Load config from presets.
	await loadConfig();

	let repository = new Repository();
	let container = document.querySelector('#main');

	let searchContainerElement = new SearchContainerElement(container, {repository});
	searchContainerElement.render();

	let hierarchy = await RemoteRepositoryAPI.getRepository();
	if (hierarchy === null) {
		noty.error('Error in data loading');
	} else {
		// The property "_hierarchy" is updated to avoid applying the filters twice.
		repository._hierarchy = hierarchy;

		let currentFolder = repository.fromPath(CONFIG['current-folder']);
		if (currentFolder === null) {
			repository.currentFolder = hierarchy;
			noty.error('Folder does not exist');
		} else {
			repository.currentFolder = currentFolder;
		}

		searchContainerElement.render();
	}

	if (!isProduction) {
		window.STSearch = {CONFIG, repository, searchContainerElement};
	}
});
