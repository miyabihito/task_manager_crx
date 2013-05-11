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

	var onClick = function() {
		$(this).find('.tm-toggle').slideToggle();
		var id = $(this).attr('id');
		TMCtrl.toggleTask(id);
	};

	$.get(chrome.extension.getURL('/html/trash.tpl'), function(template) {
		var trashList = TMCtrl.getTrash();
		$('#content').html($.mustache(template, {trash_list : trashList}));

		$('#sortable').sortable({
			stop : onSortStop
		});

		$('.tm-task-return-btn').click(onReturn);

		$('.tm-task-delete-btn').click(onDelete);

		$('.tm-task').click(onClick);
	});
};
