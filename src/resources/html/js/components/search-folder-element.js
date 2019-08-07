import { html } from 'lit-html';

import BaseElement from './base-element';

export default class SearchFolderElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-folder-element';
	}

	get template() {
		return html`
			<div id="${this.id}" class="${this.className} col-sm-6 col-md-4 col-lg-3 col-xl-2 p-1">
				<button
					type="button"
					class="btn btn-light btn-icon-primary d-flex flex-row w-100"
					title="${this.options.name}"
					@click=${this.folderClickHandler}
				>
					<div>${this.faTemplate('fas-folder', 'mr-2')}</div>
					<div class="flex-fill text-truncate">${this.options.name}</div>
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
					if (document.activeElement) {
						document.activeElement.blur();
					}

					this.options.folderClickCallback(this.options);
				}
			}
		};
	}
}
