import inRange from 'lodash/inRange';
import orderBy from 'lodash/orderBy';

import config from './config';

export const EMPTY_ROOT = { path: '/', children: [] };

export default class Repository {
	constructor(root = EMPTY_ROOT) {
		this.root = root;
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
		const folders = [];
		const files = [];

		const self = this;
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

	applyFilters(folder = this._currentFolder) {
		this.currentFolder = folder;
	}

	isFileFiltered(file) {
		return (
			// GLOBAL
			// =========
			( // If this filter is true, the file must be marked as global.
				!config.filterGlobal || (config.filterGlobal && file.isGlobal)
			)
		) && (
			// HOME
			// =========
			( // If this filter is true, the file must be marked as home.
				!config.filterHome || (config.filterHome && file.isHome)
			)
		) && (
			// FAVORITES
			// =========
			( // If this filter is true, the file must be marked as favorite.
				!config.filterFavorites || (config.filterFavorites && file.isFavorite)
			)
		) && (
			// RECENTS
			// =======
			( // If this filter is true, the file must be marked as recent.
				!config.filterRecents || (config.filterRecents && file.isRecent)
			)
		) && (
			// EXTENSIONS
			// ==========
			( // The file extension must be in the list of allowed extensions.
				config._allowedExtensionsRegex.test(file.extension)
			)
		) && (
			// SEARCH TERMS
			// ============
			( // If search terms are empty, the search is omitted.
				config._searchTerms.length === 0
			) || ( // If search in title is enabled, the search terms must appear in the title.
				config.searchInTitle
				&& config._searchTermsRegex.test(file.title)
			) || ( // If search in description is enabled, the search terms must appear in the description.
				config.searchInDescription
				&& config._searchTermsRegex.test(file.description)
			) || ( // If search in tags is enabled, the search terms must appear in the tags.
				config.searchInTags && file.properties.tags
				&& file.properties.tags.some(tag => config._searchTermsExactRegex.test(tag.value))
			)
		) && (
			// DATE RANGES
			// ===========
			( // If the minimum and maximum dates are invalid, the date is not checked.
				Number.isNaN(config._dateMinEpoch) && Number.isNaN(config._dateMaxEpoch)
			) || ( // If the minimum date is valid but the maximum date is not, check only the minimum date.
				!Number.isNaN(config._dateMinEpoch) && Number.isNaN(config._dateMaxEpoch)
				&& new Date(file[config.dateProperty]).getTime() > config._dateMinEpoch
			) || ( // If the maximum date is valid but the minimum date is not, check only the maximum date.
				Number.isNaN(config._dateMinEpoch) && !Number.isNaN(config._dateMaxEpoch)
				&& new Date(file[config.dateProperty]).getTime() < config._dateMaxEpoch
			) || ( // If the minimum and maximum dates are valid, check both.
				!Number.isNaN(config._dateMinEpoch) && !Number.isNaN(config._dateMaxEpoch)
				&& inRange(new Date(file[config.dateProperty]).getTime(), config._dateMinEpoch, config._dateMaxEpoch)
			)
		);
	}

	orderFiles(files) {
		return orderBy(files, [
			file => file.title,
			file => file.name
		]);
	}

	splitPath(path = '') {
		return path.replace(/(.+)\/$/, '$1').match(/\/[^/]*/g);
	}

	fromPath(path = '') {
		const splittedPath = this.splitPath(path);
		if (!splittedPath) {
			return null;
		}

		let currentPath = '';
		let currentFolder = this.root;
		if (currentFolder.path !== path) {
			for (let i = 0; i < splittedPath.length; i++) {
				currentPath += splittedPath[i];
				for (let j = 0; j < currentFolder.children.length; j++) {
					if (currentFolder.children[j].path === currentPath) {
						currentFolder = currentFolder.children[j];
						break;
					}
				}
				if (!currentFolder) {
					return null;
				}
			}
		}

		return currentFolder;
	}
}
