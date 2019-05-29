import { html } from 'lit-html';
import { translate } from '@appnest/lit-translate';

import formData from '../helpers/formData';
import extensionMap from '../helpers/biserver/plugins/extensionMap';

import config from '../config';

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
						<div class="flex-grow-5 mb-3 mb-md-0 mr-0 mr-md-2">
							<div class="input-group">
								<div class="input-group-prepend">
									<label for="${this.id}-search-terms" class="btn btn-icon-primary input-group-text">
										${this.faTemplate('fas-search')}
									</label>
									<button type="button" class="btn btn-icon-primary input-group-text dropdown-toggle-split" data-toggle="dropdown">
										${this.faTemplate('fas-caret-down')}
									</button>
									<div class="dropdown-menu dropdown-menu-multiselect py-2 px-0">
										<div class="dropdown-item p-0">
											<div class="px-3 pb-1">${translate('search-filter-form.searchIn')}</div>
										</div>
										<div class="dropdown-item p-0">
											<div class="btn-group-toggle" data-toggle="buttons">
												<label
													class="
														btn btn-sm btn-link text-left px-3 w-100 rounded-0
														${config.searchInTitle ? 'active' : ''}
													"
													@click=${this.formFieldChangeHandlerGenerator('search-in-title')}>
													<input name="search-in-title" value="true" type="checkbox" autocomplete="off"
														.checked=${config.searchInTitle}>
													${translate('search-filter-form.searchInTitle')}
												</label>
											</div>
										</div>
										<div class="dropdown-item p-0">
											<div class="btn-group-toggle" data-toggle="buttons">
												<label
													class="
														btn btn-sm btn-link text-left px-3 w-100 rounded-0
														${config.searchInDescription ? 'active' : ''}
													"
													@click=${this.formFieldChangeHandlerGenerator('search-in-description')}>
													<input name="search-in-description" value="true" type="checkbox" autocomplete="off"
														.checked=${config.searchInDescription}>
													${translate('search-filter-form.searchInDescription')}
													</label>
											</div>
										</div>
										<div class="dropdown-item p-0">
											<div class="btn-group-toggle" data-toggle="buttons">
												<label
													class="
														btn btn-sm btn-link text-left px-3 w-100 rounded-0
														${config.searchInTags ? 'active' : ''}
													"
													@click=${this.formFieldChangeHandlerGenerator('search-in-tags')}>
													<input name="search-in-tags" value="true" type="checkbox" autocomplete="off"
														.checked=${config.searchInTags}>
													${translate('search-filter-form.searchInTags')}
													</label>
											</div>
										</div>
									</div>
								</div>
								<input id="${this.id}-search-terms" name="search-terms" type="search" class="form-control" autofocus
									placeholder="${translate('search-filter-form.search.placeholder')}"
									.value=${config.searchTerms}
									@input=${this.formFieldChangeHandlerGenerator('search-terms')}>
							</div>
						</div>
						<div class="d-flex flex-fill flex-wrap w-100 w-md-auto mx-n1 mb-n1">
							<div class="btn-group btn-group-toggle flex-grow-5 mx-1 mb-1">
								<button type="button" class="btn btn-secondary" data-toggle="dropdown">
									${this.faTemplate('fas-tasks')}
								</button>
								<div class="dropdown-menu dropdown-menu-multiselect py-2 px-0">
									<div class="dropdown-item p-0">
										<div class="px-3 pb-1">${translate('search-filter-form.mustBeIn')}</div>
									</div>
									<div class="dropdown-item p-0">
										<div class="btn-group-toggle" data-toggle="buttons">
											<label
												class="
													btn btn-sm btn-link text-left px-3 w-100 rounded-0
													${config.filterGlobal ? 'active' : ''}
												"
												@click=${this.formFieldChangeHandlerGenerator('filter-global')}>
												<input name="filter-global" value="true" type="checkbox" autocomplete="off"
													.checked=${config.filterGlobal}>
												${translate('search-filter-form.mustBeInGlobal')}
											</label>
										</div>
									</div>
									<div class="dropdown-item p-0">
										<div class="btn-group-toggle" data-toggle="buttons">
											<label
												class="
													btn btn-sm btn-link text-left px-3 w-100 rounded-0
													${config.filterHome ? 'active' : ''}
												"
												@click=${this.formFieldChangeHandlerGenerator('filter-home')}>
												<input name="filter-home" value="true" type="checkbox" autocomplete="off"
													.checked=${config.filterHome}>
												${translate('search-filter-form.mustBeInHome')}
											</label>
										</div>
									</div>
									<div class="dropdown-item p-0">
										<div class="btn-group-toggle" data-toggle="buttons">
											<label
												class="
													btn btn-sm btn-link text-left px-3 w-100 rounded-0
													${config.filterFavorites ? 'active' : ''}
												"
												@click=${this.formFieldChangeHandlerGenerator('filter-favorites')}>
												<input name="filter-favorites" value="true" type="checkbox" autocomplete="off"
													.checked=${config.filterFavorites}>
												${translate('search-filter-form.mustBeInFavorites')}
											</label>
										</div>
									</div>
									<div class="dropdown-item p-0">
										<div class="btn-group-toggle" data-toggle="buttons">
											<label
												class="
													btn btn-sm btn-link text-left px-3 w-100 rounded-0
													${config.filterRecents ? 'active' : ''}
												"
												@click=${this.formFieldChangeHandlerGenerator('filter-recents')}>
												<input name="filter-recents" value="true" type="checkbox" autocomplete="off"
													.checked=${config.filterRecents}>
												${translate('search-filter-form.mustBeInRecents')}
											</label>
										</div>
									</div>
								</div>
								<label
									class="
										btn btn-outline-tool-cde
										${config._allowedExtensionsSet.has(extensionMap.get('cde')) ? 'active' : ''}
									"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" type="checkbox" autocomplete="off"
										.checked=${config._allowedExtensionsSet.has(extensionMap.get('cde'))}
										.value="${extensionMap.get('cde')}">
										${this.faTemplate('fac-tool-cde')}
								</label>
								${config._installedPluginsSet.has('stpivot') ? html`
									<label
										class="
											btn btn-outline-tool-stpivot
											${config._allowedExtensionsSet.has(extensionMap.get('stpivot')) ? 'active' : ''}
										"
										@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
										<input name="allowed-extensions[]" type="checkbox" autocomplete="off"
											.checked=${config._allowedExtensionsSet.has(extensionMap.get('stpivot'))}
											.value="${extensionMap.get('stpivot')}">
										${this.faTemplate('fac-tool-stpivot')}
									</label>
								` : ''}
								${config._installedPluginsSet.has('streport') ? html`
									<label
										class="
											btn btn-outline-tool-streport
											${config._allowedExtensionsSet.has(extensionMap.get('streport')) ? 'active' : ''}
										"
										@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
										<input name="allowed-extensions[]" type="checkbox" autocomplete="off"
											.checked=${config._allowedExtensionsSet.has(extensionMap.get('streport'))}
											.value="${extensionMap.get('streport')}">
										${this.faTemplate('fac-tool-streport')}
									</label>
								` : ''}
								${config._installedPluginsSet.has('stdashboard') ? html`
									<label
										class="
											btn btn-outline-tool-stdashboard
											${config._allowedExtensionsSet.has(extensionMap.get('stdashboard')) ? 'active' : ''}
										"
										@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
										<input name="allowed-extensions[]" type="checkbox" autocomplete="off"
											.checked=${config._allowedExtensionsSet.has(extensionMap.get('stdashboard'))}
											.value="${extensionMap.get('stdashboard')}">
										${this.faTemplate('fac-tool-stdashboard')}
									</label>
								` : ''}
								${config._installedPluginsSet.has('stagile') ? html`
									<label
										class="
											btn btn-outline-tool-stagile
											${config._allowedExtensionsSet.has(extensionMap.get('stagile')) ? 'active' : ''}
										"
										@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
										<input name="allowed-extensions[]" type="checkbox" autocomplete="off"
											.checked=${config._allowedExtensionsSet.has(extensionMap.get('stagile'))}
											.value="${extensionMap.get('stagile')}">
										${this.faTemplate('fac-tool-stagile')}
									</label>
								` : ''}
							</div>
							<div class="btn-group btn-group-toggle flex-fill mx-1 mb-1" data-toggle="buttons">
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
									<label for="${this.id}-date-min" class="btn btn-icon-primary input-group-text">
										${this.faTemplate('far-calendar-alt')}
									</label>
								</div>
								<input id="${this.id}-date-min" name="date-min" type="date" class="form-control"
									placeholder="yyyy-mm-dd"
									.value=${config.dateMin}
									@change=${this.formFieldChangeHandlerGenerator('date-min')}>
								<div class="input-group-prepend input-group-append">
									<label for="${this.id}-date-max" class="btn btn-icon-primary input-group-text">
										${this.faTemplate('fas-long-arrow-alt-right')}
									</label>
								</div>
								<input id="${this.id}-date-max" name="date-max" type="date" class="form-control"
									placeholder="yyyy-mm-dd"
									.value=${config.dateMax}
									@change=${this.formFieldChangeHandlerGenerator('date-max')}>
							</div>
						</div>
						<div class="d-flex flex-row w-100 w-md-auto">
							<div class="input-group flex-fill">
								<select name="date-property" class="custom-select"
									@change=${this.formFieldChangeHandlerGenerator('date-property')}>
									<option value="created"
										.selected=${config.dateProperty === 'created'}>
										${translate('search-filter-form.creationDate')}
									</option>
									<option value="modified"
										.selected=${config.dateProperty === 'modified'}>
										${translate('search-filter-form.modificationDate')}
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
					const form = new FormData(event.target);

					// Ensure that the entry exists if the checkbox is not checked.
					const checkboxes = event.target.querySelectorAll('[type=checkbox], [type=radio]');
					checkboxes.forEach(checkbox => {
						const name = checkbox.getAttribute('name');
						if (!form.has(name)) {
							form.set(name, '');
						}
					});

					const formObj = formData.objectify(form);
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
