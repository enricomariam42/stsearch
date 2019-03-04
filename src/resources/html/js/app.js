import './vendor/bootstrap';
import './vendor/fontawesome';
import './vendor/unfetch';
import {noty} from './vendor/noty';

import '../css/app.scss';

import {isProduction} from './helpers';

import DEFAULTS from './defaults';

import RemoteRepositoryAPI from './api/remote-repository-api';
import Repository from './repository';

import SearchContainerElement from './elements/search-container-element';

window.addEventListener('load', async () => {
	let repository = new Repository();

	let container = document.querySelector('#main');
	let searchContainerElement = new SearchContainerElement(container, {
		disableBanner: DEFAULTS['disable-banner'],
		disableFilters: DEFAULTS['disable-filters'],
		disableFolders: DEFAULTS['disable-folders'],
		bannerSrc: DEFAULTS['banner-src'],
		bannerTitle: DEFAULTS['banner-title'],
		bannerBackground: DEFAULTS['banner-background'],
		pageNumber: DEFAULTS['page-number'],
		pagePlaces: DEFAULTS['page-places'],
		pageSize: DEFAULTS['page-size'],
		canAdminister: false,
		repository
	});
	searchContainerElement.render();

	let canAdminister = await RemoteRepositoryAPI.canAdminister();
	searchContainerElement.options.canAdminister = canAdminister;

	let hierarchy = await RemoteRepositoryAPI.getRepository();
	if (hierarchy === null) {
		noty.error('Error in data loading');
	} else {
		// The property "_hierarchy" is updated to avoid applying the filters twice.
		repository._hierarchy = hierarchy;

		let currentFolder = repository.fromPath(DEFAULTS['current-folder']);
		if (currentFolder === null) {
			repository.currentFolder = hierarchy;
			noty.error('Folder does not exist');
		} else {
			repository.currentFolder = currentFolder;
		}

		searchContainerElement.render();
	}

	if (!isProduction) {
		window.STSearch = {DEFAULTS, repository, searchContainerElement};
	}
});
