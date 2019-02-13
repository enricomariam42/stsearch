import {html, render} from 'lit-html';

import {isProduction} from '../helpers';

export default class BaseElement {
	constructor(container = document.body, options = {}) {
		this.container = container;
		this.options = new Proxy(options, this.proxyHandler);
		this.render();
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

	get template() {
		return html``;
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
