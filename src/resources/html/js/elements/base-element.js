import jQuery from 'jquery';
import uniqueId from 'lodash/uniqueId';
import {html, render, directive} from 'lit-html';

import {isProduction} from '../helpers';

export default class BaseElement {
	constructor(container = null, options = {}) {
		this.className = 'base-element';
		this.container = container;
		this.options = options;
	}

	get id() {
		const id = uniqueId(`${this.className}-`);

		Object.defineProperty(this, 'id', {
			enumerable: true,
			configurable: false,
			writable: false,
			value: id
		});

		return this.id;
	}

	get template() {
		return html`<div id="${this.id}" class="${this.className}"></div>`;
	}

	get ref() {
		const ref = document.querySelector(`#${this.id}`);

		if (ref !== null) {
			Object.defineProperty(this, 'ref', {
				enumerable: true,
				configurable: false,
				writable: false,
				value: ref
			});

			return this.ref;
		}

		return null;
	}

	get $ref() {
		const $ref = jQuery(this.ref);

		if ($ref.length > 0) {
			Object.defineProperty(this, '$ref', {
				enumerable: true,
				configurable: false,
				writable: false,
				value: $ref
			});

			return this.$ref;
		}

		return null;
	}

	faTemplate(icon, classes = '') {
		const xlinkNamespace = 'http://www.w3.org/1999/xlink';
		const xlinkDirective = directive(value => part => {
			part.committer.element.setAttributeNS(xlinkNamespace, part.committer.name, value);
		});

		return html`
			<svg class="icon ${classes}">
				<use href="#${icon}" xlink:href="${xlinkDirective(`#${icon}`)}"></use>
			</svg>`;
	}

	render() {
		if (this.container !== null) {
			if (!isProduction) {
				/* eslint-disable-next-line no-console */
				console.time(`render (${this.id})`);
			}

			render(this.template, this.container);

			if (!isProduction) {
				/* eslint-disable-next-line no-console */
				console.timeEnd(`render (${this.id})`);
			}

			return true;
		}

		return false;
	}
}
