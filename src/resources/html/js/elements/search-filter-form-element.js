import {html} from 'lit-html';

import {formDataToMap} from '../helpers';

import BaseElement from './base-element';

export default class SearchFilterFormElement extends BaseElement {
	get template() {
		return html`
			<form id="${this.id}" class="${this.className}"
				@submit=${this.formSubmitHandler}>
				<div class="form-group">
					<div class="btn-toolbar d-flex">
						<div class="flex-fill mb-3 mb-md-0 mr-0 mr-md-2">
							<div class="input-group">
								<input name="search-terms" type="search" class="form-control" placeholder="Search..."
									@input=${this.formFieldChangeHandlerGenerator('search-terms')}>
								<div class="input-group-append">
									<button type="submit" class="btn btn-info"><i class="fas fa-fw fa-search"></i></button>
								</div>
							</div>
						</div>
						<div class="d-flex flex-row w-100 w-md-auto">
							<div class="allowed-extensions btn-group btn-group-toggle flex-fill mr-2" data-toggle="buttons">
								<label class="btn btn-outline-stpivot active"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="xjpivot" type="checkbox" checked autocomplete="off">
									<i class="fac fa-fw fa-stpivot"></i>
								</label>
								<label class="btn btn-outline-streport active"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="adhoc|prpt" type="checkbox" checked autocomplete="off">
									<i class="fac fa-fw fa-streport"></i>
								</label>
								<label class="btn btn-outline-stdashboard active"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="std" type="checkbox" checked autocomplete="off">
									<i class="fac fa-fw fa-stdashboard"></i>
								</label>
								<label class="btn btn-outline-stagile active"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="sta" type="checkbox" checked autocomplete="off">
									<i class="fac fa-fw fa-stagile"></i>
								</label>
								<label class="btn btn-outline-cde active"
									@click=${this.formFieldChangeHandlerGenerator('allowed-extensions')}>
									<input name="allowed-extensions[]" value="wcdf" type="checkbox" checked autocomplete="off">
									<i class="fac fa-fw fa-cde"></i>
								</label>
							</div>
							<div class="btn-group btn-group-toggle" data-toggle="buttons">
								<button type="button" class="btn btn-info"
									@click=${this.formRefreshHandler}>
									<i class="fas fa-fw fa-sync"></i>
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
									<span class="input-group-text"><i class="far fa-fw fa-calendar-alt"></i></span>
								</div>
								<input name="date-min" type="date" class="form-control"
									@change=${this.formFieldChangeHandlerGenerator('date-min')}>
								<div class="input-group-prepend input-group-append">
									<span class="input-group-text"><i class="fas fa-fw fa-long-arrow-alt-right"></i></span>
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
