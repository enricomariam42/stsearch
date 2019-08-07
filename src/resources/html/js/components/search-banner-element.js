import { html } from 'lit-html';

import config from '../config';

import BaseElement from './base-element';

export default class SearchBannerElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-banner-element';
	}

	get template() {
		return html`
			<div
				id="${this.id}"
				class="${this.className}"
				style="background-color: ${config.bannerBackground}"
				title="${config.bannerTitle}"
			>
				<img src="${config.bannerSrc}">
			</div>
		`;
	}
}
