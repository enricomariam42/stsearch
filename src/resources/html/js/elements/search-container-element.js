import clamp from 'lodash/clamp';
import debounce from 'lodash/debounce';
import {html} from 'lit-html';

import {Tagify} from '../vendor/tagify';
import {noty} from '../vendor/noty';

import {trigger, override, strToBool, safeJSON} from '../helpers';

import {CONFIG} from '../config';

import RemoteRepositoryAPI from '../api/remote-repository-api';
import {EMPTY_HIERARCHY} from '../repository';

import BaseElement from './base-element';
import EmptyElement from './empty-element';
import SearchBannerElement from './search-banner-element';
import SearchFilterFormElement from './search-filter-form-element';
import SearchFolderListElement from './search-folder-list-element';
import SearchFileListElement from './search-file-list-element';
import SearchFileEditModalElement from './search-file-edit-modal-element';
import SearchPaginationElement from './search-pagination-element';

export default class SearchContainerElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-container-element';
		this.currentEditingFile = null;
		this.pageNumber = 0;
	}

	get template() {
		if (CONFIG['enable-banner']) {
			this.searchBannerElement = new SearchBannerElement(null);
		} else {
			this.searchBannerElement = new EmptyElement();
		}

		if (CONFIG['enable-filters']) {
			this.searchFilterFormElement = new SearchFilterFormElement(null, {
				formSubmitCallback: formObj => {
					override(this.options.repository, {
						searchTerms: formObj['search-terms'],
						searchInTitle: strToBool(formObj['search-in-title']),
						searchInDescription: strToBool(formObj['search-in-description']),
						searchInTags: strToBool(formObj['search-in-tags']),
						allowedExtensions: formObj['allowed-extensions'],
						dateMin: formObj['date-min'],
						dateMax: formObj['date-max'],
						dateProperty: formObj['date-property']
					});
					this.options.repository.applyFilters();
					this.pageNumber = 0;
					this.render();
				},
				formRefreshCallback: async () => {
					this.options.repository.hierarchy = EMPTY_HIERARCHY;
					this.render();

					let hierarchy = await RemoteRepositoryAPI.getRepository();
					if (hierarchy === null) {
						noty.error('Error in data loading');
					} else {
						this.options.repository.hierarchy = hierarchy;
						this.render();
					}
				},
				formFieldChangeCallback: debounce(() => {
					trigger('submit', this.searchFilterFormElement.ref);
				}, 200)
			});
		} else {
			this.searchFilterFormElement = new EmptyElement();
		}

		if (CONFIG['enable-folders']) {
			this.searchFolderListElement = new SearchFolderListElement(null, {
				currentFolder: this.options.repository.currentFolder,
				parentFolder: this.options.repository.parentFolder,
				folders: this.options.repository.nestedFolders,
				folderUpCallback: () => {
					this.options.repository.currentFolder = this.options.repository.parentFolder;
					this.render();
				},
				folderDownCallback: folder => {
					this.options.repository.currentFolder = folder;
					this.render();
				}
			});
		} else {
			this.searchFolderListElement = new EmptyElement();
		}

		let filesStart = this.pageNumber * CONFIG['page-size'];
		let filesEnd = filesStart + CONFIG['page-size'];
		this.searchFileListElement = new SearchFileListElement(null, {
			files: this.options.repository.nestedFiles.slice(filesStart, filesEnd),
			fileEditCallback: fileData => {
				if (!fileData.isReadonly) {
					let file = this.options.repository.fromPath(fileData.path);
					this.currentEditingFile = file;

					this.render();
				}
			},
			fileHomeCallback: async fileData => {
				let metadata = {
					path: fileData.path,
					isHomeItem: !fileData.isHomeItem
				};
				let result = await RemoteRepositoryAPI.setMetadata(metadata);

				if (result !== null && result.length > 0) {
					let file = this.options.repository.fromPath(metadata.path);
					override(file, metadata);

					this.render();
				} else {
					noty.error('Error saving data');
				}
			},
			fileFavoriteCallback: async fileData => {
				let metadata = {
					path: fileData.path,
					isFavorite: !fileData.isFavorite
				};
				let result = await RemoteRepositoryAPI.setMetadata(metadata);

				if (result !== null && result.length > 0) {
					let file = this.options.repository.fromPath(metadata.path);
					override(file, metadata);

					this.render();
				} else {
					noty.error('Error saving data');
				}
			},
			fileTagCallback: tag => {
				this.searchFilterFormElement.ref['search-terms'].value = tag.value;
				trigger('submit', this.searchFilterFormElement.ref);
			},
			fileOpenCallback: file => {
				window.open(file.openUrl, `stsearch_${file.id}`);
			}
		});

		if (this.currentEditingFile) {
			this.searchFileEditModalElement = new SearchFileEditModalElement(null, {
				file: this.currentEditingFile,
				formSubmitCallback: async formObj => {
					let metadata = {
						path: formObj.path,
						title: formObj.title,
						description: formObj.description,
						properties: {
							thumbnail: formObj.thumbnail,
							tags: safeJSON.parse(formObj.tags, [])
						}
					};
					let result = await RemoteRepositoryAPI.setMetadata(metadata);

					if (result !== null && result.length > 0) {
						let file = this.options.repository.fromPath(metadata.path);
						override(file, metadata);

						this.currentEditingFile = null;
						this.searchFileEditModalElement.$ref.modal('hide');

						this.render();
					} else {
						noty.error('Error saving data');
					}
				}
			});
		} else {
			this.searchFileEditModalElement = new EmptyElement();
		}

		let pageTotal = Math.ceil(this.options.repository.nestedFiles.length / CONFIG['page-size']);
		if (pageTotal > 1) {
			this.searchPaginationElement = new SearchPaginationElement(null, {
				pageNumber: this.pageNumber,
				pageTotal: pageTotal,
				pageChangeCallback: pageNumber => {
					this.pageNumber = clamp(pageNumber, 0, pageTotal);
					this.render();
				}
			});
		} else {
			this.searchPaginationElement = new EmptyElement();
		}

		return html`
			<div id="${this.id}" class="${this.className} container-fluid">
				<div class="my-4">${this.searchBannerElement.template}</div>
				<div class="my-4">${this.searchFilterFormElement.template}</div>
				<div class="my-4">${this.searchFolderListElement.template}</div>
				<div class="my-4">${this.searchFileListElement.template}</div>
				<div class="my-4">${this.searchFileEditModalElement.template}</div>
				<div class="my-4">${this.searchPaginationElement.template}</div>
			</div>
		`;
	}

	render() {
		super.render();

		if (this.currentEditingFile) {
			let tagInput = this.searchFileEditModalElement.ref.querySelector('input[name="tags"]');
			this.tagify = new Tagify(tagInput, {maxTags: 10});

			this.searchFileEditModalElement.$ref.modal('show');
			this.searchFileEditModalElement.$ref.one('hide.bs.modal', () => {
				this.currentEditingFile = null;
				if (this.tagify) {
					this.tagify.destroy();
				}
			});
		}
	}
}
