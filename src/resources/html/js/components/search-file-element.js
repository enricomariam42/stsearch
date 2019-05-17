import {html} from 'lit-html';

import config from '../config';

import BaseElement from './base-element';
import SearchFileTagElement from './search-file-tag-element';

export default class SearchFileElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-file-element';
	}

	get template() {
		let tagTemplates;
		if (config.enableFileTags && Array.isArray(this.options.file.properties.tags)) {
			tagTemplates = this.options.file.properties.tags.map(tag => {
				return new SearchFileTagElement(null, {
					tag,
					fileTagCallback: this.options.fileTagCallback
				}).template;
			});
		} else {
			tagTemplates = [];
		}

		return html`
			<div id="${this.id}"
				class="${this.className} col-lg-6 col-xl-4 mb-3
					file-extension-${this.options.file.extension}
					file-recent-${this.options.file.isRecent ? 'on' : 'off'}
					file-favorite-${this.options.file.isFavorite ? 'on' : 'off'}
					file-global-${this.options.file.isGlobal ? 'on' : 'off'}
					file-home-${this.options.file.isHome ? 'on' : 'off'}
					file-readonly-${this.options.file.isReadonly ? 'on' : 'off'}
				">
				<div class="card h-100">
					<div class="card-header">
						<div class="card-buttons btn-group d-flex flex-fill flex-wrap justify-content-end m-n2">
							<button type="button" class="btn btn-light btn-inactive d-none d-sm-inline flex-fill text-left">
								${this.faTemplate(`fac-file-${this.options.file.extension}`)}
							</button>
							${config.enableFileEdit ? html`
								<button type="button" class="btn btn-light flex-grow-0"
									?disabled=${this.options.file.isReadonly}
									@click=${this.fileEditClickHandler}>
									${this.faTemplate('fas-edit')}
								</button>
							` : ''}
							${config.enableFileGlobal ? html`
								<button type="button" class="btn btn-light flex-grow-0"
									@click=${this.fileGlobalClickHandler}>
									${this.faTemplate(`${this.options.file.isGlobal ? 'fas' : 'fal'}-globe`)}
								</button>
							` : ''}
							${config.enableFileHome ? html`
								<button type="button" class="btn btn-light flex-grow-0"
									@click=${this.fileHomeClickHandler}>
									${this.faTemplate(`${this.options.file.isHome ? 'fas' : 'far'}-home-alt`)}
								</button>
							` : ''}
							${config.enableFileFavorite ? html`
								<button type="button" class="btn btn-light flex-grow-0"
									@click=${this.fileFavoriteClickHandler}>
									${this.faTemplate(`${this.options.file.isFavorite ? 'fas' : 'far'}-star`)}
								</button>
							` : ''}
							${config.enableFileOpen ? html`
								<button type="button" class="btn btn-light flex-grow-0"
									@click=${this.fileOpenClickHandler}>
									${this.faTemplate('fas-external-link-alt')}
								</button>
							` : ''}
						</div>
					</div>
					<div class="card-body">
						<div class="row no-gutters">
							<div class="col-md-2 col-lg-4 p-2">
								<div class="square-box square-box-centered border" style="max-height: 128px; max-width: 128px">
									<div class="square-box-content p-1 bg-light text-muted">
									${this.options.file.properties.thumbnail ? html`
										<img class="card-img" src="${this.options.file.properties.thumbnail}">
									` : html`
										${this.faTemplate('fas-camera-retro', 'w-auto mw-100 h-50')}
										No image
									`}
									</div>
								</div>
							</div>
							<div class="col-md-10 col-lg-8 p-2">
								<h5 class="card-title" title="${this.options.file.title}">
								${this.options.file.title.length > 40 ? html`
									${this.options.file.title.substring(0, 40)}...
								` : html`
									${this.options.file.title}
								`}
								</h5>
								<p class="card-text" title="${this.options.file.description}">
								${this.options.file.description.length > 100 ? html`
									${this.options.file.description.substring(0, 100)}...
								` : html`
									${this.options.file.description}
								`}
								</p>
							</div>
						</div>
						<div class="row no-gutters">
							<div class="col p-2">
								<div class="card-tags">
									${tagTemplates}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	get fileEditClickHandler() {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				if (typeof this.options.fileEditCallback === 'function') {
					this.options.fileEditCallback(this.options.file);
				}
			}
		};
	}

	get fileGlobalClickHandler() {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				if (typeof this.options.fileGlobalCallback === 'function') {
					this.options.fileGlobalCallback(this.options.file);
				}
			}
		};
	}

	get fileHomeClickHandler() {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				if (typeof this.options.fileHomeCallback === 'function') {
					this.options.fileHomeCallback(this.options.file);
				}
			}
		};
	}

	get fileFavoriteClickHandler() {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				if (typeof this.options.fileFavoriteCallback === 'function') {
					this.options.fileFavoriteCallback(this.options.file);
				}
			}
		};
	}

	get fileOpenClickHandler() {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				if (typeof this.options.fileOpenCallback === 'function') {
					this.options.fileOpenCallback(this.options.file);
				}
			}
		};
	}
}
