import {html} from 'lit-html';

import BaseElement from './base-element';
import SearchFileTagElement from './search-file-tag-element';

export default class SearchFileElement extends BaseElement {
	get template() {
		let tagTemplates = [
			new SearchFileTagElement(null, {
				name: this.options.extension,
				fileTagCallback: this.options.fileTagCallback
			}).template
		];

		return html`
			<div id="${this.id}" class="col-sm-12 col-lg-6 col-xl-4 mb-3">
				<div class="card h-100">
					<div class="card-header">
						<div class="card-buttons m-n2 float-right">
							<div class="btn-group">
								<button type="button" class="btn btn-light btn-sm"
									@click=${this.fileEditClickHandler}>
									<i class="fas fa-edit"></i>
								</button>
								<button type="button" class="btn btn-light btn-sm"
									@click=${this.fileHomeClickHandler}>
									<i class="fas fa-home"></i>
								</button>
								<button type="button" class="btn btn-light btn-sm"
									@click=${this.fileFavoriteClickHandler}>
									<i class="fas fa-star"></i>
								</button>
							</div>
						</div>
					</div>
					<div class="card-body">
						<div class="row no-gutters">
						${this.options.properties.thumbnail ? html`
							<div class="col-sm-2 col-lg-4 mb-2 d-flex justify-content-center align-items-start">
								<img class="card-img w-auto mw-100" style="max-height: 128px" src="${this.options.properties.thumbnail}">
							</div>
							<div class="col-sm-10 col-lg-8 px-2">
								<h5 class="card-title">${this.options.properties['file.title'] ? this.options.properties['file.title'] : this.options.name}</h5>
								<p class="card-text">${this.options.properties['file.description']}</p>
							</div>
						` : html`
							<div class="col-12 px-2">
								<h5 class="card-title">${this.options.properties['file.title'] ? this.options.properties['file.title'] : this.options.name}</h5>
								<p class="card-text">${this.options.properties['file.description']}</p>
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
}
