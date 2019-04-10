import './vendor/bootstrap';
import './vendor/fontawesome';
import './vendor/unfetch';
import Noty from './vendor/noty';

import '../css/app.scss';

import config from './config';

import RemoteRepositoryAPI from './api/remote-repository-api';
import Repository from './repository';

import SearchContainerElement from './components/search-container-element';

window.addEventListener('load', async () => {
	// Load config from presets.
	await config.loadConfig();

	const repository = new Repository();
	const container = document.querySelector('#main');

	const searchContainerElement = new SearchContainerElement(container, {repository});
	searchContainerElement.render();

	const root = await RemoteRepositoryAPI.getRepository();
	if (root === null) {
		Noty.error('Error in data loading');
	} else {
		// The property "_root" is updated to avoid applying the filters twice.
		repository._root = root;

		const currentFolder = repository.fromPath(config.currentFolder);
		if (currentFolder === null) {
			repository.currentFolder = root;
			Noty.error('Folder does not exist');
		} else {
			repository.currentFolder = currentFolder;
		}

		searchContainerElement.render();
	}

	window.STSearch = {
		config,
		repository,
		applyConfig: newConfig => {
			Object.assign(config, newConfig);
			repository.applyFilters();
			searchContainerElement.render();
		},
		doSearch: searchTerms => {
			config.searchTerms = searchTerms;
			repository.applyFilters();
			searchContainerElement.render();
		},
		doFocus: () => {
			const inputSelector = '.search-filter-form-element input[name="search-terms"]';
			const inputElement = searchContainerElement.ref.querySelector(inputSelector);
			if (inputElement) inputElement.focus();
		},
		doRefresh: async () => {
			const refreshedRoot = await RemoteRepositoryAPI.getRepository();
			if (refreshedRoot !== null) {
				repository.root = refreshedRoot;
				searchContainerElement.render();
				return true;
			}

			return false;
		}
	};
});
