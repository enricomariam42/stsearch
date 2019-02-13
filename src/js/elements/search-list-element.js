import {html} from 'lit-html';

import BaseElement from './base-element';
import SearchItemElement from './search-item-element';

export default class SearchListElement extends BaseElement {
	get template() {
		let itemTemplates;
		if (Array.isArray(this.options.items)) {
			itemTemplates = this.options.items.map(options => {
				let item = new SearchItemElement(null, options);
				return item.template;
			});
		} else {
			itemTemplates = [];
		}

		return html`
			<div class="row">${itemTemplates}</div>
		`;
	}
}
