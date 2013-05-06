/**************************************
*
* completed.js
*
* 
*
**************************************/

TMComponents.completed = {};
TMComponents.completed.onClick = function() {
	var onSortStop = function(event, ui) {
		var compOrder = [];
		$('.tm-task').each(function() {
			compOrder.push(parseInt($(this).attr('id')));
		});
		TMCtrl.setCompOrder(compOrder);
	};

	var onReturn = function(event) {
		event.stopPropagation();
		var id = $(this).parents('.tm-task').attr('id');
		TMCtrl.removeTaskToList(id);
		$('#'+id).fadeOut(500, function() { $(this).parent().remove(); });
	};

	var onTrash = function(event) {
		event.stopPropagation();
		var id = $(this).parents('.tm-task').attr('id');
		TMCtrl.removeTaskToTrash(id);
		$('#'+id).fadeOut(500, function() { $(this).parent().remove(); });
	};

	var onClick = function() {
		$(this).find('.tm-toggle').slideToggle();
		var id = $(this).attr('id');
		TMCtrl.toggleTask(id);
	};

	$.get(chrome.extension.getURL('/html/completed.tpl'), function(template) {
		var compList = TMCtrl.getComp();
		$('#content').html($.mustache(template, {comp_list : compList}));

		$('#sortable').sortable({
			stop : onSortStop
		});

		$('.tm-task-return-btn').click(onReturn);

		$('.tm-task-trash-btn').click(onTrash);

		$('.tm-task').click(onClick);
	});
};
