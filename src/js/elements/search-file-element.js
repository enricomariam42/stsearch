import {html} from 'lit-html';

import {toLocaleDateTime} from '../helpers';
import BaseElement from './base-element';
import SearchFileTagElement from './search-file-tag-element';

export default class SearchFileElement extends BaseElement {
	get template() {
		let tagTemplates;
		if (Array.isArray(this.options.tags)) {
			tagTemplates = this.options.tags.map(options => {
				let tag = new SearchFileTagElement(null, options);
				return tag.template;
			});
		} else {
			tagTemplates = [];
		}

		let cardFooterTemplate = html`
			<span class="card-extra">
				<span class="badge badge-success">Created: ${toLocaleDateTime(this.options.created)}</span>
				<span class="badge badge-success">Modified: ${toLocaleDateTime(this.options.modified)}</span>
			</span>
			<span class="card-tags">${tagTemplates}</span>
		`;

		let cardBodyTemplate = html`
			<div class="card-buttons float-sm-right">
				<div class="btn-group">
					<button type="button" class="btn btn-link"
						@click=${this.editClickHandler}>
						<i class="fas fa-edit"></i>
					</button>
					<button type="button" class="btn btn-link"
						@click=${this.homeClickHandler}>
						<i class="fas fa-home"></i>
					</button>
					<button type="button" class="btn btn-link"
						@click=${this.favoriteClickHandler}>
						<i class="fas fa-star"></i>
					</button>
				</div>
			</div>
			<h5 class="card-title pt-2">${this.options.properties['file.title']}</h5>
			<p class="card-text">${this.options.properties['file.description']}</p>
		`;

		return this.options.properties.thumbnail
			? html`
				<div class="col-sm-12 col-lg-6 col-xl-4 mb-3">
					<div class="card h-100">
						<div class="card-body">
							<div class="row no-gutters">
								<div class="col-sm-2 col-lg-4 pb-2 d-flex justify-content-center align-items-start">
									<img class="card-img w-auto mw-100" style="max-height: 128px" src="${this.options.properties.thumbnail}">
								</div>
								<div class="col-sm-10 col-lg-8 px-2">${cardBodyTemplate}</div>
							</div>
						</div>
						<div class="card-footer">${cardFooterTemplate}</div>
					</div>
				</div>
			`
			: html`
				<div class="col-sm-12 col-lg-6 col-xl-4 mb-3">
					<div class="card h-100">
						<div class="card-body">
							<div class="row no-gutters">
								<div class="col-12 px-2">${cardBodyTemplate}</div>
							</div>
						</div>
						<div class="card-footer">${cardFooterTemplate}</div>
					</div>
				</div>
			`;
	}

	get editClickHandler() {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				console.log('Edit');
			}
		};
	}

	get homeClickHandler() {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				console.log('Home');
			}
		};
	}

	get favoriteClickHandler() {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				console.log('Favorite');
			}
		};
	}
}
