import {html} from 'lit-html';

import BaseElement from './base-element';
import SearchFileTagElement from './search-file-tag-element';

export default class SearchFileElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-file-element';
	}

	get template() {
		let tagTemplates = [
			new SearchFileTagElement(null, {
				name: 'Example 1',
				fileTagCallback: this.options.fileTagCallback
			}).template,
			new SearchFileTagElement(null, {
				name: 'Example 2',
				fileTagCallback: this.options.fileTagCallback
			}).template,
			new SearchFileTagElement(null, {
				name: 'Example 3',
				fileTagCallback: this.options.fileTagCallback
			}).template
		];

		return html`
			<div id="${this.id}" class="${this.className}
				file-extension-${this.options.extension}
				file-recent-${this.options.isRecent ? 'on' : 'off'}
				file-favorite-${this.options.isFavorite ? 'on' : 'off'}
				file-home-item-${this.options.isHomeItem ? 'on' : 'off'}
				file-readonly-${this.options.isReadonly ? 'on' : 'off'}
				col-sm-12 col-lg-6 col-xl-4 mb-3">
				<div class="card h-100">
					<div class="card-header">
						<div class="card-logo btn-group m-n2 float-left">
							<button type="button" class="btn btn-light" disabled>
								${this.faTemplate(`fac-file-${this.options.extension}`)}
							</button>
						</div>
						<div class="card-buttons btn-group m-n2 float-right">
							<button type="button" class="btn btn-light"
								?disabled=${this.options.isReadonly}
								@click=${this.fileEditClickHandler}>
								${this.faTemplate('fas-edit')}
							</button>
							<button type="button" class="btn btn-light
								${this.options.canAdminister ? '' : 'd-none'}"
								@click=${this.fileHomeClickHandler}>
								${this.faTemplate(`${this.options.isHomeItem ? 'fas' : 'far'}-home`)}
							</button>
							<button type="button" class="btn btn-light"
								@click=${this.fileFavoriteClickHandler}>
								${this.faTemplate(`${this.options.isFavorite ? 'fas' : 'far'}-star`)}
							</button>
							<button type="button" class="btn btn-light"
								@click=${this.fileOpenClickHandler}>
								${this.faTemplate('fas-external-link-alt')}
							</button>
						</div>
					</div>
					<div class="card-body">
						<div class="row no-gutters">
						${this.options.properties.thumbnail ? html`
							<div class="col-sm-2 col-lg-4 mb-2 d-flex justify-content-center align-items-start">
								<img class="card-img w-auto mw-100" style="max-height: 128px" src="${this.options.properties.thumbnail}">
							</div>
							<div class="col-sm-10 col-lg-8 px-2">
								<h5 class="card-title">
									${this.options.properties['file.title'] ? this.options.properties['file.title'] : this.options.name}
								</h5>
								<p class="card-text text-truncate" title="${this.options.properties['file.description']}">
									${this.options.properties['file.description']}
								</p>
							</div>
						` : html`
							<div class="col-12 px-2">
								<h5 class="card-title">
									${this.options.properties['file.title'] ? this.options.properties['file.title'] : this.options.name}
								</h5>
								<p class="card-text text-truncate" title="${this.options.properties['file.description']}">
									${this.options.properties['file.description']}
								</p>
							</div>
						`}
						</div>
					</div>
					<div class="card-footer">
						<span class="card-tags">${tagTemplates}</span>
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
					this.options.fileEditCallback(this.options);
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
					this.options.fileHomeCallback(this.options);
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
					this.options.fileFavoriteCallback(this.options);
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
					this.options.fileOpenCallback(this.options);
				}
			}
		};
	}
}
