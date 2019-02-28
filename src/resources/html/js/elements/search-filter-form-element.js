import {html} from 'lit-html';

import {formDataToMap} from '../helpers';

import BaseElement from './base-element';

export default class SearchFilterFormElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-filter-form-element';
	}

	get template() {
		return html`
			<form id="${this.id}" class="${this.className}"
				@submit=${this.formSubmitHandler}>
				<div class="form-group">
					<div class="btn-toolbar d-flex">
						<div class="flex-fill mb-3 mb-md-0 mr-0 mr-md-2">
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										${this.faTemplate('fas-search')}
									</span>
									<button type="button" class="btn dropdown-toggle dropdown-toggle-split input-group-text" data-toggle="dropdown"></button>
									<div class="dropdown-menu dropdown-menu-multiselect py-2 px-0">
										<div class="dropdown-item p-0">
											<div class="px-3 pb-1">Search in:</div>
										</div>
										<div class="dropdown-item p-0">
											<div class="btn-group-toggle" data-toggle="buttons">
												<label class="btn btn-sm btn-link text-left px-3 w-100 rounded-0 active"
													@click=${this.formFieldChangeHandlerGenerator('search-in-title')}>
													<input name="search-in-title" value="true" type="checkbox" checked autocomplete="off">
													Title
												</label>
											</div>
										</div>
										<div class="dropdown-item p-0">
											<div class="btn-group-toggle" data-toggle="buttons">
												<label class="btn btn-sm btn-link text-left px-3 w-100 rounded-0 active"
													@click=${this.formFieldChangeHandlerGenerator('search-in-description')}>
													<input name="search-in-description" value="true" type="checkbox" checked autocomplete="off">
													Description
												</label>
											</div>
										</div>
										<div class="dropdown-item p-0">
											<div class="btn-group-toggle" data-toggle="buttons">
												<label class="btn btn-sm btn-link text-left px-3 w-100 rounded-0 active"
													@click=${this.formFieldChangeHandlerGenerator('search-in-tags')}>
													<input name="search-in-tags" value="true" type="checkbox" checked autocomplete="off">
													Tags
												</label>
											</div>
										</div>
									</div>
								</div>
								<input name="search-terms" type="search" class="form-control" placeholder="Search..."
									@input=${this.formFieldChangeHandlerGenerator('search-terms')}>
							</div>
						</div>
						<div class="d-flex flex-row w-100 w-md-auto">
							<div class="allowed-extensions btn-group btn-group-toggle flex-fill mr-2" data-toggle="buttons">
								<label class="btn btn-outline-tool-cde active"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="wcdf" type="checkbox" checked autocomplete="off">
									${this.faTemplate('fac-tool-cde')}
								</label>
								<label class="btn btn-outline-tool-stpivot active"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="xjpivot" type="checkbox" checked autocomplete="off">
									${this.faTemplate('fac-tool-stpivot')}
								</label>
								<label class="btn btn-outline-tool-streport active"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="adhoc|prpt" type="checkbox" checked autocomplete="off">
									${this.faTemplate('fac-tool-streport')}
								</label>
								<label class="btn btn-outline-tool-stdashboard active"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="std" type="checkbox" checked autocomplete="off">
									${this.faTemplate('fac-tool-stdashboard')}
								</label>
								<label class="btn btn-outline-tool-stagile active"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="sta" type="checkbox" checked autocomplete="off">
									${this.faTemplate('fac-tool-stagile')}
								</label>
							</div>
							<div class="btn-group btn-group-toggle" data-toggle="buttons">
								<button type="button" class="btn btn-info"
									@click=${this.formRefreshHandler}>
									${this.faTemplate('fas-sync')}
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="btn-toolbar d-flex">
						<div class="flex-fill mb-3 mb-md-0 mr-0 mr-md-2">
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										${this.faTemplate('far-calendar-alt')}
									</span>
								</div>
								<input name="date-min" type="date" class="form-control"
									@change=${this.formFieldChangeHandlerGenerator('date-min')}>
								<div class="input-group-prepend input-group-append">
									<span class="input-group-text">
										${this.faTemplate('fas-long-arrow-alt-right')}
									</span>
								</div>
								<input name="date-max" type="date" class="form-control"
									@change=${this.formFieldChangeHandlerGenerator('date-max')}>
							</div>
						</div>
						<div class="d-flex flex-row w-100 w-md-auto">
							<div class="input-group flex-fill">
								<select name="date-property" class="custom-select"
									@change=${this.formFieldChangeHandlerGenerator('date-property')}>
									<option value="created" selected>Creation date</option>
									<option value="modified">Modification date</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</form>
		`;
	}

	get formSubmitHandler() {
		return {
			capture: true,
			passive: false,
			once: false,
			handleEvent: event => {
				event.preventDefault();
				if (typeof this.options.formSubmitCallback === 'function') {
					let formData = new FormData(event.target);

					// Ensure that the entry exists if the checkbox is not checked.
					let checkboxes = event.target.querySelectorAll('[type=checkbox], [type=radio]');
					for (let checkbox of checkboxes) {
						let name = checkbox.getAttribute('name');
						if (!formData.has(name)) {
							formData.set(name, '');
						}
					}

					let formMap = formDataToMap(formData);
					this.options.formSubmitCallback(formMap);
				}
			}
		};
	}

	get formRefreshHandler() {
		return {
			capture: true,
			passive: false,
			once: false,
			handleEvent: () => {
				if (typeof this.options.formRefreshCallback === 'function') {
					this.options.formRefreshCallback();
				}
			}
		};
	}

	formFieldChangeHandlerGenerator(field) {
		return {
			capture: true,
			passive: false,
			once: false,
			handleEvent: event => {
				if (typeof this.options.formFieldChangeCallback === 'function') {
					this.options.formFieldChangeCallback(field, event);
				}
			}
		};
	}
}
