import {html} from 'lit-html';

import BaseElement from './base-element';
import SearchListElement from './search-list-element';
import SearchPaginationElement from './search-pagination-element';

export default class SearchContainerElement extends BaseElement {
	get template() {
		let itemsStart = this.options.pageNumber * this.options.pageSize;
		let itemsEnd = itemsStart + this.options.pageSize;
		let searchListElement = new SearchListElement(null, {
			items: this.options.items.slice(itemsStart, itemsEnd)
		});

		let searchPaginationElement = new SearchPaginationElement(null, {
			pageNumber: this.options.pageNumber,
			pagePlaces: this.options.pagePlaces,
			pageTotal: Math.ceil(this.options.items.length / this.options.pageSize),
			pageChangeCallback: pageNumber => {
				this.options.pageNumber = pageNumber;
				this.render();
			}
		});

		return html`
			<div>
				${searchListElement.template}
				${searchPaginationElement.template}
			</div>
		`;
	}
}
