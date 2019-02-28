import clamp from 'lodash/clamp';
import debounce from 'lodash/debounce';
import {html} from 'lit-html';

import {Tagify} from '../vendor/tagify';
import {noty} from '../vendor/noty';

import {trigger, override, safeJSON} from '../helpers';

import RemoteRepositoryAPI from '../api/remote-repository-api';
import {EMPTY_HIERARCHY} from '../repository';

import BaseElement from './base-element';
import EmptyElement from './empty-element';
import SearchFilterFormElement from './search-filter-form-element';
import SearchFolderListElement from './search-folder-list-element';
import SearchFileListElement from './search-file-list-element';
import SearchFileEditModalElement from './search-file-edit-modal-element';
import SearchPaginationElement from './search-pagination-element';

export default class SearchContainerElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-container-element';
	}

	get template() {
		this.searchFilterFormElement = new SearchFilterFormElement(null, {
			formSubmitCallback: formMap => {
				override(this.options.repository, {
					searchTerms: formMap.get('search-terms'),
					searchInTitle: formMap.get('search-in-title') === 'true',
					searchInDescription: formMap.get('search-in-description') === 'true',
					searchInTags: formMap.get('search-in-tags') === 'true',
					allowedExtensions: formMap.get('allowed-extensions'),
					dateMin: formMap.get('date-min'),
					dateMax: formMap.get('date-max'),
					dateProperty: formMap.get('date-property')
				});
				this.options.repository.applyFilters();
				this.options.pageNumber = 0;
				this.render();
			},
			formRefreshCallback: async () => {
				this.options.repository.hierarchy = EMPTY_HIERARCHY;
				this.render();

				let result = await this.options.repository.refresh();
				this.render();

				if (!result) {
					noty.error('Error in data loading');
				}
			},
			formFieldChangeCallback: debounce(() => {
				trigger('submit', this.searchFilterFormElement.ref);
			}, 200)
		});

		this.searchFolderListElement = new SearchFolderListElement(null, {
			folders: this.options.repository.nestedFolders,
			hasParent: this.options.repository.parentFolder !== null,
			folderUpCallback: () => {
				this.options.repository.currentFolder = this.options.repository.parentFolder;
				this.render();
			},
			folderDownCallback: folder => {
				this.options.repository.currentFolder = folder;
				this.render();
			}
		});

		let filesStart = this.options.pageNumber * this.options.pageSize;
		let filesEnd = filesStart + this.options.pageSize;
		this.searchFileListElement = new SearchFileListElement(null, {
			files: this.options.repository.nestedFiles.slice(filesStart, filesEnd),
			canAdminister: this.options.canAdminister,
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
				console.log('open', file);
				noty.info('[TODO] Open');
			}
		});

		this.searchFileEditModalElement = this.currentEditingFile
			? new SearchFileEditModalElement(null, {
				file: this.currentEditingFile,
				formSubmitCallback: async formMap => {
					let metadata = {
						path: formMap.get('path'),
						title: formMap.get('title'),
						description: formMap.get('description'),
						properties: {
							thumbnail: formMap.get('thumbnail'),
							tags: safeJSON.parse(formMap.get('tags'), [])
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
			})
			: new EmptyElement();

		let pageTotal = Math.ceil(this.options.repository.nestedFiles.length / this.options.pageSize);
		this.searchPaginationElement = pageTotal > 1
			? new SearchPaginationElement(null, {
				pageNumber: this.options.pageNumber,
				pagePlaces: this.options.pagePlaces,
				pageTotal: pageTotal,
				pageChangeCallback: pageNumber => {
					this.options.pageNumber = clamp(pageNumber, 0, pageTotal);
					this.render();
				}
			})
			: new EmptyElement();

		return html`
			<div id="${this.id}" class="${this.className} container-fluid">
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
