import jQuery from 'jquery';
import uniqueId from 'lodash/uniqueId';
import {html, render, directive} from 'lit-html';

import {isProduction} from '../helpers';

export default class BaseElement {
	constructor(container = null, options = {}) {
		this.className = 'base-element';
		this.container = container;

		/* The following line causes the element to be rendered automatically when the options
		 * change. It is commented because currently this behavior is not necessary.
		 */ // this.options = new Proxy(options, this.proxyHandler);
		this.options = options;

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
