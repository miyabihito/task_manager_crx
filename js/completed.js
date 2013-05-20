/**************************************
*
* completed.js
*
* 
*
**************************************/

TM.Components.completed = {};
TM.Components.completed.onClick = function() {
	var onSortStop = function(event, ui) {
		var compOrder = [];
		$('.tm-task').each(function() {
			compOrder.push(parseInt($(this).attr('id')));
		});
		TM.Ctrl.setCompOrder(compOrder);
	};

	var onReturn = function(event) {
		event.stopPropagation();
		var id = $(this).parents('.tm-task').attr('id');

		var task = {};
		task.id = id;
		task.isCompleted = false;
		TM.Ctrl.editTask(task);

		TM.Ctrl.removeTaskToList(id);
		$('#'+id).fadeOut(500, function() { $(this).parent().remove(); });
	};

	var onTrash = function(event) {
		event.stopPropagation();
		var id = $(this).parents('.tm-task').attr('id');
		TM.Ctrl.removeTaskToTrash(id);
		$('#'+id).fadeOut(500, function() { $(this).parent().remove(); });
	};

	var onToggle = function() {
		var toggle = $(this);
		toggle.parents('.tm-task').find('.tm-toggle-target').slideToggle();
		toggle.toggleClass('ui-icon-triangle-1-n ui-icon-triangle-1-s');

		var id = toggle.parents('.tm-task').attr('id');
		TM.Ctrl.toggleTask(id);
	};

	$.get(chrome.extension.getURL('/html/completed.tpl'), function(template) {
		var compList = TM.Ctrl.getComp();
		$('#content').html($.mustache(template, {comp_list : compList}));

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

		$('.tm-task-trash-btn').click(onTrash);
	});
};
