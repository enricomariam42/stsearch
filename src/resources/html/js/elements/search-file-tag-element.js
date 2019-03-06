import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchFileTagElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-file-tag-element';
	}

	get template() {
		return html`
			<a id="${this.id}"
				title="${this.options.tag.value}"
				class="${this.className} badge"
				@click=${this.tagClickHandler}
				href="javascript:void(0)">
				${this.options.tag.value}
			</a>
		`;
	}

	get tagClickHandler() {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				if (typeof this.options.fileTagCallback === 'function') {
					this.options.fileTagCallback(this.options.tag);
				}
			}
		};
	}
}
