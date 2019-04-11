import {html} from 'lit-html';

import BaseElement from './base-element';

export default class EmptyElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'empty-element';
	}

	get template() {
		return html`<div id="${this.id}" class="${this.className}"></div>`;
	}
}
