import jQuery from 'jquery';
import uniqueId from 'lodash/uniqueId';
import {html, render} from 'lit-html';

import {isProduction} from '../helpers';

export default class BaseElement {
	constructor(container = null, options = {}) {
		this.container = container;
		this.options = new Proxy(options, this.proxyHandler);
		this.render();
	}

	get id() {
		let id = uniqueId(`${this.className}-`);

		Object.defineProperty(this, 'id', {
			enumerable: true,
			configurable: false,
			writable: false,
			value: id
		});

		return this.id;
	}

	get className() {
		let className = this.constructor.name
			.replace(/(.+?)([A-Z])/g, '$1-$2')
			.toLowerCase();

		Object.defineProperty(this, 'className', {
			enumerable: true,
			configurable: false,
			writable: false,
			value: className
		});

		return this.className;
	}

	get template() {
		return html`<div id="${this.id}" class="${this.className}"></div>`;
	}

	get ref() {
		let ref = document.querySelector(`#${this.id}`);

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
		let $ref = jQuery(this.ref);

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

	get proxyHandler() {
		return {
			set: (obj, prop, value) => {
				obj[prop] = value;
				this.render();
				return true;
			}
		};
	}

	render() {
		if (this.container !== null) {
			if (!isProduction) {
				console.time(`render (${this.id})`);
			}

			render(this.template, this.container);

			if (!isProduction) {
				console.timeEnd(`render (${this.id})`);
			}

			return true;
		}

		return false;
	}
}
