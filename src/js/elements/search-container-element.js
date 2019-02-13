import clamp from 'lodash/clamp';
import {html} from 'lit-html';

import BaseElement from './base-element';
import SearchFormElement from './search-form-element';
import SearchListElement from './search-list-element';
import SearchPaginationElement from './search-pagination-element';

export default class SearchContainerElement extends BaseElement {
	get template() {
		let searchFormElement = new SearchFormElement(null, {});

		let itemsStart = this.options.pageNumber * this.options.pageSize;
		let itemsEnd = itemsStart + this.options.pageSize;
		let searchListElement = new SearchListElement(null, {
			items: this.options.items.slice(itemsStart, itemsEnd)
		});

		let pageTotal = Math.ceil(this.options.items.length / this.options.pageSize);
		let searchPaginationElement = new SearchPaginationElement(null, {
			pageNumber: this.options.pageNumber,
			pagePlaces: this.options.pagePlaces,
			pageTotal: pageTotal,
			pageChangeCallback: pageNumber => {
				this.options.pageNumber = clamp(pageNumber, 0, pageTotal);
				this.render();
			}
		});

		return html`
			<div class="container-fluid">
				<div class="m-4">${searchFormElement.template}</div>
				<div class="m-4">${searchListElement.template}</div>
				<div class="m-4">${searchPaginationElement.template}</div>
			</div>
		`;
	}
}
