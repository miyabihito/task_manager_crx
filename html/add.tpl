<div id="tm-add-modal" class="modal hide fade">
	<div class="modal-header">
		<h3>INPUT NEW TASK</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal">
			<div class="control-group">
				<label class="control-label" for="title">TITLE</label>
				<div class="controls">
					<input type="text" id="title" placeholder="input title.">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="deadline">DEADLINE</label>
				<div class="controls">
					<input type="text" id="deadline" placeholder="YYYY/MM/DD">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="detail">DETAIL</label>
				<div class="controls">
					<textarea id="detail" rows="3" placeholder="input detail."></textarea>
				</div>
			</div>
	</div>
	<div class="modal-footer">
		<a id="tm-add-task-btn" href="#" class="btn btn-primary">Save</a>
		<a id="tm-add-task-cancel-btn" href="#" class="btn">Cancel</a>
	</div>
</div>
