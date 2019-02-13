import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchFormElement extends BaseElement {
	get template() {
		return html`
			<form>
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-fw fa-search"></i></span>
						</div>
						<input type="search" class="form-control">
						<div class="input-group-append">
							<button type="button" class="btn btn-outline-secondary" data-toggle="button"><i class="fac fa-fw fa-stpivot"></i></button>
							<button type="button" class="btn btn-outline-secondary" data-toggle="button"><i class="fac fa-fw fa-streport"></i></button>
							<button type="button" class="btn btn-outline-secondary" data-toggle="button"><i class="fac fa-fw fa-stdashboard"></i></button>
							<button type="button" class="btn btn-outline-secondary" data-toggle="button"><i class="fac fa-fw fa-stagile"></i></button>
							<button type="button" class="btn btn-outline-secondary" data-toggle="button"><i class="fac fa-fw fa-cde"></i></button>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="far fa-fw fa-calendar-alt"></i></span>
						</div>
						<input type="date" class="form-control">
						<div class="input-group-prepend input-group-append">
							<span class="input-group-text"><i class="fas fa-fw fa-long-arrow-alt-right"></i></span>
						</div>
						<input type="date" class="form-control">
						<select class="custom-select">
							<option selected value="creation">Creation date</option>
							<option value="modification">Modification date</option>
						</select>
					</div>
				</div>
			</form>
		`;
	}
}
