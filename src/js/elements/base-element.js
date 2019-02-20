import uniqueId from 'lodash/uniqueId';
import {html, render} from 'lit-html';

import {isProduction} from '../helpers';

export default class BaseElement {
	constructor(container = document.body, options = {}) {
		this.container = container;
		this.options = new Proxy(options, this.proxyHandler);
		this.render();
	}

	get id() {
		Object.defineProperty(this, 'id', {
			enumerable: true,
			configurable: false,
			writable: false,
			value: uniqueId(
				`${this.constructor.name
					.replace(/(.+?)([A-Z])/g, '$1-$2')
					.toLowerCase()
				}-`
			)
		});

		return this.id;
	}

	get template() {
		return html``;
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
				console.time('render');
			}

			render(this.template, this.container);

			if (!isProduction) {
				console.timeEnd('render');
			}

			return true;
		}

		return false;
	}
}
