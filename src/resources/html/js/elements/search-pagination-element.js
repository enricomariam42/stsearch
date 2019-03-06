import clamp from 'lodash/clamp';
import {html} from 'lit-html';

import {CONFIG} from '../config';

import BaseElement from './base-element';

export default class SearchPaginationElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-pagination-element';
	}

	get template() {
		let isFirstPage = this.options.pageNumber < 1;
		let isLastPage = this.options.pageNumber + 1 >= this.options.pageTotal;

		let pageNumberStart = this.options.pageNumber - Math.floor(CONFIG['page-places'] / 2);
		let pageNumberEnd = pageNumberStart + CONFIG['page-places'];

		if (pageNumberStart < 1) {
			pageNumberStart = 0;
			pageNumberEnd = clamp(CONFIG['page-places'], 0, this.options.pageTotal);
		}

		if (pageNumberEnd > this.options.pageTotal) {
			pageNumberStart = clamp(this.options.pageTotal - CONFIG['page-places'], 0, this.options.pageTotal);
			pageNumberEnd = this.options.pageTotal;
		}

		let pageNumberTemplates = [];
		for (let n = pageNumberStart; n < pageNumberEnd; n++) {
			let isActive = n === this.options.pageNumber;
			let displayNumber = n + 1;

			pageNumberTemplates.push(html`
				<li class="page-item ${isActive ? 'active' : ''}">
					<a class="page-link" href="javascript:void(0)"
						@click=${this.pageClickHandlerGenerator(n)}>
						${displayNumber}
					</a>
				</li>
			`);
		}

		let pageFirstTemplate = html`
			<li class="page-item ${isFirstPage ? 'disabled' : ''}">
				<a class="page-link" href="javascript:void(0)"
					@click=${this.pageClickHandlerGenerator(0)}>
					${this.faTemplate('fas-angle-double-left')}
				</a>
			</li>
		`;

		let pagePreviousTemplate = html`
			<li class="page-item ${isFirstPage ? 'disabled' : ''}">
				<a class="page-link" href="javascript:void(0)"
					@click=${this.pageClickHandlerGenerator(this.options.pageNumber - 1)}>
					${this.faTemplate('fas-angle-left')}
				</a>
			</li>
		`;

		let pageNextTemplate = html`
			<li class="page-item ${isLastPage ? 'disabled' : ''}">
				<a class="page-link" href="javascript:void(0)"
					@click=${this.pageClickHandlerGenerator(this.options.pageNumber + 1)}>
					${this.faTemplate('fas-angle-right')}
				</i></a>
			</li>
		`;

		let pageLastTemplate = html`
			<li class="page-item ${isLastPage ? 'disabled' : ''}">
				<a class="page-link" href="javascript:void(0)"
					@click=${this.pageClickHandlerGenerator(this.options.pageTotal - 1)}>
					${this.faTemplate('fas-angle-double-right')}
				</i></a>
			</li>
		`;

		return html`
			<nav id="${this.id}" class="${this.className}">
				<ul class="pagination justify-content-center">
					${pageFirstTemplate}
					${pagePreviousTemplate}
					${pageNumberTemplates}
					${pageNextTemplate}
					${pageLastTemplate}
				</ul>
			</nav>
		`;
	}

	pageClickHandlerGenerator(pageNumber) {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				if (typeof this.options.pageChangeCallback === 'function') {
					this.options.pageChangeCallback(pageNumber);
				}
			}
		};
	}
}
