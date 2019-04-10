import {html} from 'lit-html';

import {formData, safeJSON} from '../helpers';

import BaseElement from './base-element';

export default class SearchFileEditModalElement extends BaseElement {
	constructor(...args) {
		super(...args);
		this.className = 'search-file-edit-modal-element';
	}

	get template() {
		return html`
			<form id="${this.id}" class="${this.className} modal" tabindex="-1"
				@submit=${this.formSubmitHandler}>
				<div class="modal-dialog modal-lg">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">${this.options.file.title}</h5>
							<button type="button" class="close" data-dismiss="modal">&times;</button>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-sm-12 col-lg-3 mb-3">
									<div class="square-box square-box-centered border" style="max-height: 128px; max-width: 128px">
										<div class="square-box-content p-1 text-muted">
										${this.options.file.properties.thumbnail ? html`
											<img class="card-img" src="${this.options.file.properties.thumbnail}">
										` : html`
											${this.faTemplate('fas-camera-retro', 'w-auto mw-100 h-50')}
											No image
										`}
										</div>
									</div>
								</div>
								<div class="col-sm-12 col-lg-9">
									<div class="form-group">
										<label class="w-100">
											<div class="mb-2">Path</div>
											<input name="path" type="text" class="form-control" readonly
												placeholder="Path..."
												.value=${this.options.file.path}>
										</label>
									</div>
									<div class="form-group">
										<label class="w-100">
											<div class="mb-2">Title</div>
											<input name="title" type="text" class="form-control" maxlength="100"
												placeholder="Title..."
												.value=${this.options.file.title}>
										</label>
									</div>
									<div class="form-group">
										<div class="w-100">
											<div class="mb-2">Image</div>
											<div class="custom-file">
												<input name="thumbnail" type="file" class="custom-file-input">
												<span class="custom-file-label">Choose file</span>
											</div>
										</div>
									</div>
									<div class="form-group">
										<label class="w-100">
											<div class="mb-2">Description</div>
											<textarea name="description" type="text" class="form-control" rows="3" maxlength="500"
											placeholder="Description..."
											>${this.options.file.description}</textarea>
										</label>
									</div>
									<div class="form-group">
										<label class="w-100">
											<div class="mb-2">Tags</div>
											<input name="tags" type="hidden" class="form-control"
												.value=${this.options.file.properties.tags ? safeJSON.stringify(this.options.file.properties.tags, '[]') : '[]'}>
										</label>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
							<button type="submit" class="btn btn-primary">Ok</button>
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

					const formObj = formData.objectify(form);
					this.options.formSubmitCallback(formObj);
				}
			}
		};
	}
}
