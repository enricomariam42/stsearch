import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchFolderElement extends BaseElement {
	get template() {
		return html`
			<button id="${this.id}" type="button" class="${this.className} btn btn-light border m-1"
				@click=${this.folderClickHandler}>
				<i class="${this.options.iconClass}"></i>
				${this.options.name}
			</button>
		`;
	}

	get folderClickHandler() {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				if (typeof this.options.folderClickCallback === 'function') {
					this.options.folderClickCallback(this.options);
				}
			}
		};
	}
}
