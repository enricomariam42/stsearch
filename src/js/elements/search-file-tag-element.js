import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchItemTagElement extends BaseElement {
	get template() {
		return html`
			<a class="badge badge-primary text-wrap text-break" href="javascript:void(0)"
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
				console.log(`${this.options.name}`);
			}
		};
	}
}
