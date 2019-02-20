import {html} from 'lit-html';

import BaseElement from './base-element';

export default class SearchFileEditModalElement extends BaseElement {
	get template() {
		return html`
			<div id="${this.id}" class="modal" tabindex="-1">
				<div class="modal-dialog modal-lg">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">${this.options.properties['file.title']}</h5>
							<button type="button" class="close" data-dismiss="modal">&times;</button>
						</div>
						<div class="modal-body">
							<form>
								<div class="row">
									<div class="col-3">
										<div class="d-flex flex-column justify-content-center align-items-center">
										${this.options.properties.thumbnail ? html`
											<img class="card-img w-auto mw-100" src="${this.options.properties.thumbnail}">
										` : html`
											<i class="far fa-image fa-fw w-75 h-auto"></i>
											<p>No image available</p>
										`}
										</div>
									</div>
									<div class="col-9">
										<div class="form-group">
											<label class="w-100">
												<div class="mb-2">Path</div>
												<input name="path" type="text" class="form-control" placeholder="Path..." disabled
													value="${this.options.path}">
											</label>
										</div>
										<div class="form-group">
											<label class="w-100">
												<div class="mb-2">Title</div>
												<input name="title" type="text" class="form-control" placeholder="Title..." maxlength="100"
													value="${this.options.properties['file.title'] ? this.options.properties['file.title'] : this.options.name}">
											</label>
										</div>
										<div class="form-group">
											<label class="w-100">
												<div class="mb-2">Image</div>
												<input name="thumbnail" type="text" class="form-control" placeholder="https://" maxlength="200"
													value="${this.options.properties.thumbnail ? this.options.properties.thumbnail : ''}">
											</label>
										</div>
										<div class="form-group">
											<label class="w-100">
												<div class="mb-2">Description</div>
												<textarea name="description" type="text" class="form-control" placeholder="Description..." rows="3" maxlength="500"
												>${this.options.properties['file.description']}</textarea>
											</label>
										</div>
										<div class="form-group">
											<label class="w-100">
												<div class="mb-2">Tags</div>
												<input name="tags" type="text" class="form-control" value="">
											</label>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
							<button type="button" class="btn btn-primary">Ok</button>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
