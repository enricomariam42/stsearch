import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchFolderElement extends BaseElement {
	get template() {
		return html`
			<li class="list-group-item m-1">
				<button type="button" class="btn btn-link"
					@click=${this.folderClickHandlerGenerator(this.options)}>
					<i class="${this.options.iconClass}"></i>
					${this.options.name}
				</button>
			</li>
		`;
	}

	folderClickHandlerGenerator(pageNumber) {
		return {
			capture: true,
			passive: true,
			once: false,
			handleEvent: () => {
				if (typeof this.options.folderClickCallback === 'function') {
					this.options.folderClickCallback(pageNumber);
				}
			}
		};
	}
}
