/**************************************
*
* add.js
*
* 
*
**************************************/

TMComponents.add = {};
TMComponents.add.onClick = function() {
	$.get(chrome.extension.getURL('/html/list.tpl'), function(template) {
		var taskList = TMCtrl.getList();
		$('#content').html($.mustache(template, {task_list : taskList}));

		$.get(chrome.extension.getURL('/html/add.tpl'), function(modal) {
			$('#content').append(modal);
// set event listner
			$('#deadline').datepicker({
				dateFormat : "yy/mm/dd",
				onSelect : function() { $('#detail').focus() },
			});

			$('#tm-add-task-btn').click(function(){
				var task = {};
				task.title = $('#title').val();
				task.detail = $('#detail').val();
				task.deadline = $('#deadline').val();
				task.toggle = true;
				TMCtrl.addTask(task);

				$('#tm-add-modal').modal('hide');
			});

			$('#tm-add-task-cancel-btn').click(function(){
				$('#tm-add-modal').modal('hide');
			});

			$('#tm-add-modal').on('hidden', function() {
				$('#tm-add-modal').remove();
				$('#list').click();
			})
			.on('shown', function() {
				$('#title').focus();
			})
			.modal('show');
		});
	});

};
