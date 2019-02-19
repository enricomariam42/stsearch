import {html} from 'lit-html';

import BaseElement from './base-element';
import SearchFileElement from './search-file-element';

export default class SearchFileListElement extends BaseElement {
	get template() {
		let fileTemplates;
		if (Array.isArray(this.options.files)) {
			fileTemplates = this.options.files.map(options => {
				let file = new SearchFileElement(null, options);
				return file.template;
			});
		} else {
			fileTemplates = [];
		}

		return html`
			<div class="row">${fileTemplates}</div>
		`;
	}
}
