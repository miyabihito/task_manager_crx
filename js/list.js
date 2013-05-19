/**************************************
*
* list.js
*
* 
*
**************************************/

TMComponents.list = {};
TMComponents.list.onClick = function() {

	var onEdit = function(event) {
		event.stopPropagation();
		var id = $(this).parents('.tm-task').attr('id');
		$.get(chrome.extension.getURL('/html/edit.tpl'), function(modal) {
			var task = TMCtrl.getTask(id);
			$('#content').append($.mustache(modal,task));

			$('#deadline').datepicker({
				dateFormat : "yy/mm/dd",
				onSelect : function() { $('#detail').focus() },
			});

			$('#tm-edit-task-btn').click(function() {
				TMCtrl.editTask(
					{
						id : id,
						title : $('#title').val(),
						detail : $('#detail').val(),
						deadline : $('#deadline').val(),
					}
				);
				$('#tm-edit-modal').modal('hide');
			});

			$('#tm-edit-task-cancel-btn').click(function() {
				$('#tm-edit-modal').modal('hide');
			});

			$('#tm-edit-modal').on('shown', function() {
				$('#title').focus();
			})
			.on('hidden', function() {
				TMComponents.list.onClick();
			})
			.modal('show');

		});
	};

	var onCompleted = function(event) {
		event.stopPropagation();
		var id = $(this).parents('.tm-task').attr('id');
		TMCtrl.removeTaskToCompleted(id);
		$('#'+id).fadeOut(500, function() { $(this).parent().remove(); });
	};

	var onTrash = function(event) {
		event.stopPropagation();
		var id = $(this).parents('.tm-task').attr('id');
		TMCtrl.removeTaskToTrash(id);
		$('#'+id).fadeOut(500, function() { $(this).parent().remove(); });
	};

	var onToggle = function() {
		var toggle = $(this);
		toggle.parents('.tm-task').find('.tm-toggle-target').slideToggle();
		toggle.toggleClass('ui-icon-triangle-1-n ui-icon-triangle-1-s');

		var id = toggle.parents('.tm-task').attr('id');
		TMCtrl.toggleTask(id);
	};

	var onSortStop = function(event, ui) {
		var listOrder = [];
		$('.tm-task').each(function() {
			listOrder.push(parseInt($(this).attr('id')));
		});
		TMCtrl.setListOrder(listOrder);
	};

	$.get(chrome.extension.getURL('/html/list.tpl'), function(template) {
		var taskList = TMCtrl.getList();
		$('#content').html($.mustache(template, {task_list : taskList}));

		$('.ui-state-default').mouseenter( function() {
			$(this).addClass('ui-state-hover');
		})
		.mouseleave( function() {
			$(this).removeClass('ui-state-hover');
		});

		$('.tm-toggle').click(onToggle);

		$('#sortable').sortable({
			stop : onSortStop,
			handle : '.handle',
			opacity : 0.7,
		});

		$('.tm-task-edit-btn').click(onEdit);

		$('.tm-task-comp-btn').click(onCompleted);

		$('.tm-task-trash-btn').click(onTrash);
	});
};
