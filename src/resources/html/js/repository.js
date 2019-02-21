import inRange from 'lodash/inRange';

import RemoteFileMetadata from './remote-file-metadata';

export const DEFAULT_SEARCH_TERMS = '';
export const DEFAULT_ALLOWED_EXTENSIONS = ['xjpivot', 'adhoc|prpt', 'std', 'sta', 'wcdf'];
export const DEFAULT_DATE_MIN = new Date(-8640000000000000);
export const DEFAULT_DATE_MAX = new Date(8640000000000000);
export const DEFAULT_DATE_PROPERTY = 'created';

export const EMPTY_HIERARCHY = {path: '/', children: []};

export default class Repository {
	constructor(hierarchy = EMPTY_HIERARCHY) {
		this.initializeFilters();
		this.hierarchy = hierarchy;
	}

	splitPath(path = '') {
		return path.replace(/(.+)\/$/, '$1').match(/\/[^/]*/g);
	}

	fromPath(path = '') {
		let splittedPath = this.splitPath(path);
		if (!splittedPath) {
			return null;
		}

		let currentPath = '';
		let currentLocation = this.hierarchy;
		if (currentLocation.path !== path) {
			for (let i = 0; i < splittedPath.length; i++) {
				currentPath += splittedPath[i];
				currentLocation = currentLocation.children.find(child => {
					return child.path === currentPath;
				});
				if (!currentLocation) {
					return null;
				}
			}
		}

		return currentLocation;
	}

	async refresh() {
		let hierarchy = await RemoteFileMetadata.getRepository();
		if (hierarchy !== null) {
			this.hierarchy = hierarchy;
			return true;
		}

		return false;
	}

	get hierarchy() {
		return this._hierarchy;
	}

	set hierarchy(hierarchy) {
		this._hierarchy = hierarchy;
		this.currentFolder = hierarchy;
	}

	get parentFolder() {
		return this.currentFolder.parent
			? this.fromPath(this.currentFolder.parent)
			: null;
	}

	get currentFolder() {
		return this._currentFolder;
	}

	set currentFolder(currentFolder) {
		let folders = [];
		let files = [];
		let self = this;
		(function flatten(children, addFolders) {
			children.forEach(child => {
				if (child.isFolder) {
					if (addFolders) {
						folders.push(child);
					}

					flatten(child.children, false);
				} else if (self.isFileFiltered(child)) {
					files.push(child);
				}
			});
		})(currentFolder.children, true);

		this._currentFolder = currentFolder;
		this.nestedFolders = folders;
		this.nestedFiles = files;
	}

	/*
	 * FILTERS
	 */

	initializeFilters() {
		this.searchTerms = DEFAULT_SEARCH_TERMS;
		this.allowedExtensions = DEFAULT_ALLOWED_EXTENSIONS;
		this.dateMin = DEFAULT_DATE_MIN;
		this.dateMax = DEFAULT_DATE_MAX;
		this.dateProperty = DEFAULT_DATE_PROPERTY;
	}

	applyFilters() {
		this.currentFolder = this._currentFolder;
	}

	resetFilters() {
		this.initializeFilters();
		this.applyFilters();
	}

	isFileFiltered(file) {
		return (
			this._allowedExtensionsRegex.test(file.extension)
		) && (
			this._searchTermsRegex.test(file.properties['file.title']) ||
			this._searchTermsRegex.test(file.properties['file.description'])
		) && (
			inRange(
				new Date(file[this.dateProperty]).getTime(),
				this._dateMinEpoch, this._dateMaxEpoch
			)
		);
	}

	get searchTerms() {
		return this._searchTerms;
	}

	set searchTerms(searchTerms) {
		this._searchTerms = searchTerms ? searchTerms : DEFAULT_SEARCH_TERMS;
		this._searchTermsRegex = new RegExp(this._searchTerms, 'i');
	}

	get allowedExtensions() {
		return this._allowedExtensions;
	}

	set allowedExtensions(allowedExtensions) {
		this._allowedExtensions = allowedExtensions ? allowedExtensions : DEFAULT_ALLOWED_EXTENSIONS;
		this._allowedExtensionsRegex = new RegExp(`^(?:${this._allowedExtensions.join('|')})$`, 'i');
	}

	get dateMin() {
		return this._dateMin;
	}

	set dateMin(dateMin) {
		this._dateMin = dateMin ? new Date(dateMin) : DEFAULT_DATE_MIN;
		this._dateMinEpoch = this._dateMin.getTime();
	}

	get dateMax() {
		return this._dateMax;
	}

	set dateMax(dateMax) {
		this._dateMax = dateMax ? new Date(dateMax) : DEFAULT_DATE_MAX;
		this._dateMaxEpoch = this._dateMax.getTime();
	}
}
