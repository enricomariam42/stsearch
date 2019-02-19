import inRange from 'lodash/inRange';

export const DEFAULT_SEARCH_TERMS = '';
export const DEFAULT_ALLOWED_EXTENSIONS = ['xjpivot', 'adhoc', 'std', 'sta', 'cde', 'prpt', '.+'];
export const DEFAULT_MIN_DATE = new Date(-8640000000000000);
export const DEFAULT_MAX_DATE = new Date(8640000000000000);

export default class Repository {
	constructor(hierarchy, filters = {}) {
		this.searchTerms = filters.searchTerms ? filters.searchTerms : DEFAULT_SEARCH_TERMS;
		this.allowedExtensions = filters.allowedExtensions ? filters.allowedExtensions : DEFAULT_ALLOWED_EXTENSIONS;
		this.allowedExtensions = filters.allowedExtensions ? filters.allowedExtensions : DEFAULT_ALLOWED_EXTENSIONS;
		this.minCreationDate = filters.minCreationDate ? filters.minCreationDate : DEFAULT_MIN_DATE;
		this.maxCreationDate = filters.maxCreationDate ? filters.maxCreationDate : DEFAULT_MAX_DATE;
		this.minModificationDate = filters.minModificationDate ? filters.minModificationDate : DEFAULT_MIN_DATE;
		this.maxModificationDate = filters.maxModificationDate ? filters.maxModificationDate : DEFAULT_MAX_DATE;
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

	applyFilters() {
		this.currentFolder = this._currentFolder;
	}

	isFileFiltered(file) {
		return (
			this._allowedExtensionsRegex.test(file.extension)
		) && (
			this._searchTermsRegex.test(file.properties['file.title']) ||
			this._searchTermsRegex.test(file.properties['file.description'])
		) && (
			inRange(new Date(file.created).getTime(), this._minCreationDateEpoch, this._maxCreationDateEpoch) &&
			inRange(new Date(file.modified).getTime(), this._minModificationDateEpoch, this._maxModificationDateEpoch)
		);
	}

	get searchTerms() {
		return this._searchTerms;
	}

	set searchTerms(searchTerms) {
		this._searchTerms = searchTerms;
		this._searchTermsRegex = new RegExp(searchTerms, 'i');
	}

	get allowedExtensions() {
		return this._allowedExtensions;
	}

	set allowedExtensions(allowedExtensions) {
		this._allowedExtensions = allowedExtensions;
		this._allowedExtensionsRegex = new RegExp(`^(?:${allowedExtensions.join('|')})$`, 'i');
	}

	get minCreationDate() {
		return this._minCreationDate;
	}

	set minCreationDate(minCreationDate) {
		this._minCreationDate = new Date(minCreationDate);
		this._minCreationDateEpoch = this._minCreationDate.getTime();
	}

	get maxCreationDate() {
		return this._maxCreationDate;
	}

	set maxCreationDate(maxCreationDate) {
		this._maxCreationDate = new Date(maxCreationDate);
		this._maxCreationDateEpoch = this._maxCreationDate.getTime();
	}

	get minModificationDate() {
		return this._minModificationDate;
	}

	set minModificationDate(minModificationDate) {
		this._minModificationDate = new Date(minModificationDate);
		this._minModificationDateEpoch = this._minModificationDate.getTime();
	}

	get maxModificationDate() {
		return this._maxModificationDate;
	}

	set maxModificationDate(maxModificationDate) {
		this._maxModificationDate = new Date(maxModificationDate);
		this._maxModificationDateEpoch = this._maxModificationDate.getTime();
	}
}
