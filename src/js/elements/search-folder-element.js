import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchFolderElement extends BaseElement {
	get template() {
		return html`
			<button type="button" class="btn btn-outline-secondary m-1"
				@click=${this.folderClickHandlerGenerator(this.options)}>
				<i class="${this.options.iconClass}"></i>
				${this.options.name}
			</button>
		`;
	}

	folderClickHandlerGenerator(options) {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				if (typeof this.options.folderClickCallback === 'function') {
					this.options.folderClickCallback(options);
				}
			}
		};
	}
}
