import {html} from 'lit-html';

import {formData} from '../helpers';

import {CONFIG} from '../config';

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
									<label for="${this.id}-search-terms" class="btn input-group-text">
										${this.faTemplate('fas-search')}
									</label>
									<button type="button" class="btn dropdown-toggle dropdown-toggle-split input-group-text" data-toggle="dropdown"></button>
									<div class="dropdown-menu dropdown-menu-multiselect py-2 px-0">
										<div class="dropdown-item p-0">
											<div class="px-3 pb-1">Search in:</div>
										</div>
										<div class="dropdown-item p-0">
											<div class="btn-group-toggle" data-toggle="buttons">
												<label
													class="
														btn btn-sm btn-link text-left px-3 w-100 rounded-0
														${CONFIG['search-in-title'] ? 'active' : ''}
													"
													@click=${this.formFieldChangeHandlerGenerator('search-in-title')}>
													<input name="search-in-title" value="true" type="checkbox" autocomplete="off"
														?checked=${CONFIG['search-in-title']}>
													Title
												</label>
											</div>
										</div>
										<div class="dropdown-item p-0">
											<div class="btn-group-toggle" data-toggle="buttons">
												<label
													class="
														btn btn-sm btn-link text-left px-3 w-100 rounded-0
														${CONFIG['search-in-description'] ? 'active' : ''}
													"
													@click=${this.formFieldChangeHandlerGenerator('search-in-description')}>
													<input name="search-in-description" value="true" type="checkbox" autocomplete="off"
														?checked=${CONFIG['search-in-description']}>
													Description
												</label>
											</div>
										</div>
										<div class="dropdown-item p-0">
											<div class="btn-group-toggle" data-toggle="buttons">
												<label
													class="
														btn btn-sm btn-link text-left px-3 w-100 rounded-0
														${CONFIG['search-in-tags'] ? 'active' : ''}
													"
													@click=${this.formFieldChangeHandlerGenerator('search-in-tags')}>
													<input name="search-in-tags" value="true" type="checkbox" autocomplete="off"
														?checked=${CONFIG['search-in-tags']}>
													Tags
												</label>
											</div>
										</div>
									</div>
								</div>
								<input id="${this.id}-search-terms" name="search-terms" type="search" class="form-control" placeholder="Search..."
									value=${CONFIG['search-terms']}
									@input=${this.formFieldChangeHandlerGenerator('search-terms')}>
							</div>
						</div>
						<div class="d-flex flex-row w-100 w-md-auto">
							<div class="allowed-extensions btn-group btn-group-toggle flex-fill mr-2" data-toggle="buttons">
								<label
									class="
										btn btn-outline-tool-cde 
										${CONFIG['allowed-extensions'].includes('wcdf') ? 'active' : ''}
									"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="wcdf" type="checkbox" autocomplete="off"
										?checked=${CONFIG['allowed-extensions'].includes('wcdf')}>
									${this.faTemplate('fac-tool-cde')}
								</label>
								<label
									class="
										btn btn-outline-tool-stpivot
										${CONFIG['allowed-extensions'].includes('xjpivot') ? 'active' : ''}
									"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="xjpivot" type="checkbox" autocomplete="off"
										?checked=${CONFIG['allowed-extensions'].includes('xjpivot')}>
									${this.faTemplate('fac-tool-stpivot')}
								</label>
								<label
									class="
										btn btn-outline-tool-streport
										${CONFIG['allowed-extensions'].includes('adhoc|prpt') ? 'active' : ''}
									"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="adhoc|prpt" type="checkbox" autocomplete="off"
										?checked=${CONFIG['allowed-extensions'].includes('adhoc|prpt')}>
									${this.faTemplate('fac-tool-streport')}
								</label>
								<label
									class="
										btn btn-outline-tool-stdashboard
										${CONFIG['allowed-extensions'].includes('std') ? 'active' : ''}
									"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="std" type="checkbox" autocomplete="off"
										?checked=${CONFIG['allowed-extensions'].includes('std')}>
									${this.faTemplate('fac-tool-stdashboard')}
								</label>
								<label
									class="
										btn btn-outline-tool-stagile
										${CONFIG['allowed-extensions'].includes('sta') ? 'active' : ''}
									"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="sta" type="checkbox" autocomplete="off"
										?checked=${CONFIG['allowed-extensions'].includes('sta')}>
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
									<label for="${this.id}-date-min" class="btn input-group-text">
										${this.faTemplate('far-calendar-alt')}
									</label>
								</div>
								<input id="${this.id}-date-min" name="date-min" type="date" class="form-control" placeholder="yyyy-mm-dd"
									value=${CONFIG['date-min']}
									@change=${this.formFieldChangeHandlerGenerator('date-min')}>
								<div class="input-group-prepend input-group-append">
									<label for="${this.id}-date-max" class="btn input-group-text">
										${this.faTemplate('fas-long-arrow-alt-right')}
									</label>
								</div>
								<input id="${this.id}-date-max" name="date-max" type="date" class="form-control" placeholder="yyyy-mm-dd"
									value=${CONFIG['date-max']}
									@change=${this.formFieldChangeHandlerGenerator('date-max')}>
							</div>
						</div>
						<div class="d-flex flex-row w-100 w-md-auto">
							<div class="input-group flex-fill">
								<select name="date-property" class="custom-select"
									@change=${this.formFieldChangeHandlerGenerator('date-property')}>
									<option value="created"
										?selected=${CONFIG['date-property'] === 'created'}>
										Creation date
									</option>
									<option value="modified"
										?selected=${CONFIG['date-property'] === 'modified'}>
										Modification date
									</option>
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
					let form = new FormData(event.target);

					// Ensure that the entry exists if the checkbox is not checked.
					let checkboxes = event.target.querySelectorAll('[type=checkbox], [type=radio]');
					for (let checkbox of checkboxes) {
						let name = checkbox.getAttribute('name');
						if (!form.has(name)) {
							form.set(name, '');
						}
					}

					let formObj = formData.objectify(form);
					this.options.formSubmitCallback(formObj);
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
