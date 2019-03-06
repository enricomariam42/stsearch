import escapeRegExp from 'lodash/escapeRegExp';
import inRange from 'lodash/inRange';
import orderBy from 'lodash/orderBy';

import {CONFIG} from './config';

export const EMPTY_ROOT = {path: '/', children: []};

export default class Repository {
	constructor(root = EMPTY_ROOT) {
		this.initializeFilters();
		this.root = root;
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
		let currentFolder = this.root;
		if (currentFolder.path !== path) {
			for (let i = 0; i < splittedPath.length; i++) {
				currentPath += splittedPath[i];
				currentFolder = currentFolder.children.find(child => {
					return child.path === currentPath;
				});
				if (!currentFolder) {
					return null;
				}
			}
		}

		return currentFolder;
	}

	get root() {
		return this._root;
	}

	set root(root) {
		this._root = root;
		this.currentFolder = root;
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
		(function flatten(children, folderDepth = 1) {
			children.forEach(child => {
				if (child.isFolder) {
					if (folderDepth > 0) {
						folders.push(child);
					}

					flatten(child.children, folderDepth - 1);
				} else if (self.isFileFiltered(child)) {
					files.push(child);
				}
			});
		})(currentFolder.children);

		this.folders = this.orderFiles(folders);
		this.files = this.orderFiles(files);
		this._currentFolder = currentFolder;
	}

	/*
	 * FILTERS
	 */

	initializeFilters() {
		this.searchInTitle = CONFIG['search-in-title'];
		this.searchInDescription = CONFIG['search-in-description'];
		this.searchInTags = CONFIG['search-in-tags'];
		this.searchTerms = CONFIG['search-terms'];
		this.allowedExtensions = CONFIG['allowed-extensions'];
		this.dateMin = CONFIG['date-min'];
		this.dateMax = CONFIG['date-max'];
		this.dateProperty = CONFIG['date-property'];
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
			// EXTENSIONS
			// ==========
			( // The file extension must be in the list of allowed extensions.
				this._allowedExtensionsRegex.test(file.extension)
			)
		) && (
			// SEARCH TERMS
			// ============
			( // If search terms are empty, the search is omitted.
				this._searchTerms.length === 0
			) || ( // If search in title is enabled, the search terms must appear in the title.
				this.searchInTitle &&
				this._searchTermsRegex.test(file.title)
			) || ( // If search in description is enabled, the search terms must appear in the description.
				this.searchInDescription &&
				this._searchTermsRegex.test(file.description)
			) || ( // If search in tags is enabled, the search terms must appear in the tags.
				this.searchInTags && file.properties.tags &&
				file.properties.tags.some(tag => this._searchTermsExactRegex.test(tag.value))
			)
		) && (
			// DATE RANGES
			// ===========
			( // If the minimum and maximum dates are invalid, the date is not checked.
				isNaN(this._dateMinEpoch) && isNaN(this._dateMaxEpoch)
			) || ( // If the minimum date is valid but the maximum date is not, check only the minimum date.
				!isNaN(this._dateMinEpoch) && isNaN(this._dateMaxEpoch) &&
				new Date(file[this.dateProperty]).getTime() > this._dateMinEpoch
			) || ( // If the maximum date is valid but the minimum date is not, check only the maximum date.
				isNaN(this._dateMinEpoch) && !isNaN(this._dateMaxEpoch) &&
				new Date(file[this.dateProperty]).getTime() < this._dateMaxEpoch
			) || ( // If the minimum and maximum dates are valid, check both.
				!isNaN(this._dateMinEpoch) && !isNaN(this._dateMaxEpoch) &&
				inRange(new Date(file[this.dateProperty]).getTime(), this._dateMinEpoch, this._dateMaxEpoch)
			)
		);
	}

	orderFiles(files) {
		return orderBy(files, [
			file => file.title,
			file => file.name
		]);
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
