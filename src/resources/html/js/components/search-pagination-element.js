import clamp from 'lodash/clamp';
import { html } from 'lit-html';

import config from '../config';

import BaseElement from './base-element';

export default class SearchPaginationElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-pagination-element';
	}

	get template() {
		const isRtl = document.documentElement.dir === 'rtl';
		const isFirstPage = this.options.pageNumber < 1;
		const isLastPage = this.options.pageNumber + 1 >= this.options.pageTotal;

		let pageNumberStart = this.options.pageNumber - Math.floor(config.pagePlaces / 2);
		let pageNumberEnd = pageNumberStart + config.pagePlaces;

		if (pageNumberStart < 1) {
			pageNumberStart = 0;
			pageNumberEnd = clamp(config.pagePlaces, 0, this.options.pageTotal);
		}

		if (pageNumberEnd > this.options.pageTotal) {
			pageNumberStart = clamp(this.options.pageTotal - config.pagePlaces, 0, this.options.pageTotal);
			pageNumberEnd = this.options.pageTotal;
		}

		const pageNumberTemplates = [];
		for (let n = pageNumberStart; n < pageNumberEnd; n++) {
			const isActive = n === this.options.pageNumber;
			const displayNumber = n + 1;

			pageNumberTemplates.push(html`
				<li class="page-item ${isActive ? 'active' : ''}">
					<a
						class="page-link"
						href="javascript:void(0)"
						@click=${this.pageClickHandlerGenerator(n)}
					>
						${displayNumber}
					</a>
				</li>
			`);
		}

		const pageFirstTemplate = html`
			<li class="page-item ${isFirstPage ? 'disabled' : ''}">
				<a
					class="page-link"
					href="javascript:void(0)"
					@click=${this.pageClickHandlerGenerator(0)}
				>
					${this.faTemplate(isRtl ? 'fas-angles-right' : 'fas-angles-left')}
				</a>
			</li>
		`;

		const pagePreviousTemplate = html`
			<li class="page-item ${isFirstPage ? 'disabled' : ''}">
				<a
					class="page-link"
					href="javascript:void(0)"
					@click=${this.pageClickHandlerGenerator(this.options.pageNumber - 1)}
				>
					${this.faTemplate(isRtl ? 'fas-angle-right' : 'fas-angle-left')}
				</a>
			</li>
		`;

		const pageNextTemplate = html`
			<li class="page-item ${isLastPage ? 'disabled' : ''}">
				<a
					class="page-link"
					href="javascript:void(0)"
					@click=${this.pageClickHandlerGenerator(this.options.pageNumber + 1)}
				>
					${this.faTemplate(isRtl ? 'fas-angle-left' : 'fas-angle-right')}
				</i></a>
			</li>
		`;

		const pageLastTemplate = html`
			<li class="page-item ${isLastPage ? 'disabled' : ''}">
				<a
					class="page-link"
					href="javascript:void(0)"
					@click=${this.pageClickHandlerGenerator(this.options.pageTotal - 1)}
				>
					${this.faTemplate(isRtl ? 'fas-angles-left' : 'fas-angles-right')}
				</i></a>
			</li>
		`;

		return html`
			<nav id="${this.id}" class="${this.className}">
				<ul class="pagination flex-wrap justify-content-center">
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
			},
		};
	}
}
