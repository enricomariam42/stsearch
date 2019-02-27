import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchFileTagElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-file-tag-element';
	}

	get template() {
		return html`
			<a id="${this.id}" class="${this.className} badge badge-primary text-wrap text-break" href="javascript:void(0)"
				@click=${this.tagClickHandler}>
				${this.options.name}
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
					this.options.fileTagCallback(this.options);
				}
			}
		};
	}
}
