import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchFolderElement extends BaseElement {
	get template() {
		return html`
			<button id="${this.id}" type="button" class="${this.className} btn btn-light border m-1"
				@click=${this.folderClickHandler}>
				${this.faTemplate(this.options.icon, this.options.name ? 'mr-1' : '')}
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
