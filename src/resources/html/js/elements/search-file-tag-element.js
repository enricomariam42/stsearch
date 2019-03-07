import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchFileTagElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-file-tag-element';
	}

	get template() {
		return html`
			<button id="${this.id}" class="${this.className} btn btn-light"
				title="${this.options.tag.value}"
				@click=${this.tagClickHandler}>
				${this.options.tag.value}
			</button>
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
