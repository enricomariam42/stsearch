import '../css/app.scss';

import './vendor/bootstrap';
import './vendor/fontawesome';
import Noty from './vendor/noty';

import getRepository from './helpers/biserver/getRepository';

import config from './config';
import Repository from './repository';

import SearchContainerElement from './components/search-container-element';

window.addEventListener('load', async () => {
	// Load config from parameters and presets.
	await config.loadConfig();

	const repository = new Repository();
	const container = document.querySelector('#main');

	const searchContainerElement = new SearchContainerElement(container, {repository});
	searchContainerElement.render();

	if ('stsearch_repository' in window.parent) {
		repository.root = window.parent.stsearch_repository;
		searchContainerElement.render();
	} else {
		getRepository()
			.then(root => {
				repository.root = root;
				searchContainerElement.render();
			})
			.catch(() => {
				Noty.error('Error in data loading');
			});
	}

	const STSearch = {config, repository};

	STSearch.applyConfig = (newConfig, reset = false) => {
		config.applyConfig(newConfig, reset);
		repository.applyFilters(repository.root);
		searchContainerElement.render();
		return STSearch;
	};

	STSearch.applyPreset = (preset, reset = true) => {
		config.applyPreset(preset, reset);
		repository.applyFilters(repository.root);
		searchContainerElement.render();
		return STSearch;
	};

	STSearch.resetConfig = () => {
		config.resetConfig();
		repository.applyFilters(repository.root);
		searchContainerElement.render();
		return STSearch;
	};

	STSearch.isLoading = () => {
		return document.body.classList.contains('loading');
	};

	STSearch.doSearch = (searchTerms, reset = false) => {
		if (reset) config.resetConfig();
		config.searchTerms = searchTerms;
		repository.applyFilters(reset ? repository.root : undefined);
		searchContainerElement.render();
		return STSearch;
	};

	STSearch.doFocus = (fieldName = 'search-terms') => {
		const formRef = searchContainerElement.searchFilterFormElement.ref;
		const fieldRef = formRef.querySelector(`[name="${fieldName}"]`);
		if (fieldRef) fieldRef.focus();
		return STSearch;
	};

	STSearch.doRefresh = async () => {
		if (!STSearch.isLoading()) {
			const refreshedRoot = await getRepository();
			if (refreshedRoot !== null) {
				repository.root = refreshedRoot;
				searchContainerElement.render();
			}
		}
		return STSearch;
	};

	window.STSearch = STSearch;
});
