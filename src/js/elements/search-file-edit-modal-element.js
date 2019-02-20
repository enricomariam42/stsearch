import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchFileEditModalElement extends BaseElement {
	get template() {
		return html`
			<div id="${this.id}" class="modal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
						</div>
						<div class="modal-body">
						</div>
						<div class="modal-footer">
						</div>
					</div>
				</div>
			</div>
		`;
	}

	show() {
		this.$ref.modal('show');
	}

	hide() {
		this.$ref.modal('hide');
	}
}
