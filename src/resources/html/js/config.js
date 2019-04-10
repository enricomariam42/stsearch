import escapeRegExp from 'lodash/escapeRegExp';

import {searchParams, override, strToBool, strToInt} from './helpers';

import RemoteRepositoryAPI from './api/remote-repository-api';

const CONFIG = {};
const PRESETS = {};

class Config {
	loadConfig = async () => {
		const response = await fetch('./presets.json', {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		});

		if (response.status === 200) {
			override(PRESETS, await response.json());

			const paramsConfig = searchParams.parse(window.location.search, {preset: 'default'});
			override(CONFIG, PRESETS.default, PRESETS[paramsConfig.preset], paramsConfig);

			this.enableBanner = strToBool(CONFIG['enable-banner']);
			this.enableFilters = strToBool(CONFIG['enable-filters']);
			this.enableFolders = strToBool(CONFIG['enable-folders']);
			this.enableFileTags = strToBool(CONFIG['enable-file-tags']);
			this.enableFileEdit = strToBool(CONFIG['enable-file-edit']);
			this.enableFileHome = strToBool(CONFIG['enable-file-home']);
			this.enableFileFavorite = strToBool(CONFIG['enable-file-favorite']);
			this.enableFileOpen = strToBool(CONFIG['enable-file-open']);
			this.bannerSrc = CONFIG['banner-src'];
			this.bannerTitle = CONFIG['banner-title'];
			this.bannerBackground = CONFIG['banner-background'];
			this.searchInTitle = strToBool(CONFIG['search-in-title']);
			this.searchInDescription = strToBool(CONFIG['search-in-description']);
			this.searchInTags = strToBool(CONFIG['search-in-tags']);
			this.searchTerms = CONFIG['search-terms'];
			this.filterFavorites = strToBool(CONFIG['filter-favorites']);
			this.filterRecents = strToBool(CONFIG['filter-recents']);
			this.allowedExtensions = CONFIG['allowed-extensions'];
			this.dateMin = CONFIG['date-min'];
			this.dateMax = CONFIG['date-max'];
			this.dateProperty = CONFIG['date-property'];
			this.maxTags = strToInt(CONFIG['max-tags']);
			this.pagePlaces = strToInt(CONFIG['page-places']);
			this.pageSize = strToInt(CONFIG['page-size']);
			this.currentFolder = CONFIG['current-folder'];

			// If "enableFileHome" is true, check if the user really has permission.
			if (this.enableFileHome) {
				const canAdminister = await RemoteRepositoryAPI.canAdminister();
				this.enableFileHome = canAdminister;
			}
		}
	}

	get searchTerms() {
		return this._searchTerms;
	}

	set searchTerms(searchTerms) {
		this._searchTerms = searchTerms;
		this._searchTermsRegex = new RegExp(escapeRegExp(this._searchTerms), 'i');
		this._searchTermsExactRegex = new RegExp(`^${escapeRegExp(this._searchTerms)}$`, 'i');
	}

	get allowedExtensions() {
		return this._allowedExtensions;
	}

	set allowedExtensions(allowedExtensions) {
		this._allowedExtensions = allowedExtensions;
		this._allowedExtensionsRegex = new RegExp(`^(?:${this._allowedExtensions.join('|')})$`, 'i');
	}

	get dateMin() {
		return this._dateMin;
	}

	set dateMin(dateMin) {
		this._dateMin = new Date(dateMin);
		this._dateMinEpoch = this._dateMin.getTime();
	}

	get dateMax() {
		return this._dateMax;
	}

	set dateMax(dateMax) {
		this._dateMax = new Date(dateMax);
		this._dateMaxEpoch = this._dateMax.getTime();
	}
}

export default new Config();
