import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchFolderElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-folder-element';
	}

	get template() {
		return html`
			<div id="${this.id}" class="${this.className} col-sm-6 col-md-4 col-lg-3 col-xl-2 p-1">
				<button type="button" class="btn btn-light border w-100 text-truncate"
					title="${this.options.name}"
					@click=${this.folderClickHandler}>
					${this.faTemplate('fas-folder', 'mr-1')}
					${this.options.name}
				</button>
			</div>
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
