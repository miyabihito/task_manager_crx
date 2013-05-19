/**************************************
*
* trash.js
*
*
*
**************************************/

TMComponents.trash = {};
TMComponents.trash.onClick = function() {
	var onSortStop = function(event, ui) {
		var trashOrder = [];
		$('.tm-task').each(function() {
			trashOrder.push(parseInt($(this).attr('id')));
		});
		TMCtrl.setTrashOrder(trashOrder);
	};

	var onReturn = function(event) {
		event.stopPropagation();
		var id = $(this).parents('.tm-task').attr('id');

		var task = TMCtrl.getTask(id);
		if ( task.isCompleted )
		{
			TMCtrl.removeTaskToCompleted(id);
		}
		else
		{
			TMCtrl.removeTaskToList(id);
		}

		$('#'+id).fadeOut(500, function() { $(this).parent().remove(); });
	};

	var onDelete = function(event) {
		event.stopPropagation();
		var id = $(this).parents('.tm-task').attr('id');
		TMCtrl.deleteTask(id);
		$('#'+id).fadeOut(500, function() { $(this).parent().remove(); });
	};

	var onToggle = function() {
		var toggle = $(this);
		toggle.parents('.tm-task').find('.tm-toggle-target').slideToggle();
		toggle.toggleClass('ui-icon-triangle-1-n ui-icon-triangle-1-s');

		var id = toggle.parents('.tm-task').attr('id');
		TMCtrl.toggleTask(id);
	};

	$.get(chrome.extension.getURL('/html/trash.tpl'), function(template) {
		var trashList = TMCtrl.getTrash();
		$('#content').html($.mustache(template, {trash_list : trashList}));

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

		$('.tm-task-return-btn').click(onReturn);

		$('.tm-task-delete-btn').click(onDelete);

	});
};
