import {html} from 'lit-html';

import BaseElement from './base-element';

export default class EmptyElement extends BaseElement {
	get template() {
		return html``;
	}
}
