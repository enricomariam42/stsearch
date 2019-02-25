import {html} from 'lit-html';

import BaseElement from './base-element';
import SearchFolderElement from './search-folder-element';

export default class SearchFolderListElement extends BaseElement {
	get template() {
		let previousFolder;
		if (this.options.hasParent) {
			previousFolder = new SearchFolderElement(null, {
				icon: 'fas-arrow-left',
				folderClickCallback: this.options.folderUpCallback
			});
		} else {
			previousFolder = '';
		}

		let folderTemplates;
		if (Array.isArray(this.options.folders)) {
			folderTemplates = this.options.folders.map(options => {
				let folder = new SearchFolderElement(null, {
					...options,
					icon: 'fas-folder',
					folderClickCallback: this.options.folderDownCallback
				});
				return folder.template;
			});
		} else {
			folderTemplates = [];
		}

		return html`
			<div id="${this.id}" class="${this.className} m-n1">
				${previousFolder.template}
				${folderTemplates}
			</div>
		`;
	}
}
