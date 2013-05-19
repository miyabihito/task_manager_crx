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

		var task = {};
		task.id = id;
		task.isCompleted = false;
		TMCtrl.editTask(task);

		TMCtrl.removeTaskToList(id);
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

	$.get(chrome.extension.getURL('/html/completed.tpl'), function(template) {
		var compList = TMCtrl.getComp();
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
