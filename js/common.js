/**************************************
*
* common.js
*
* prepare common settings
* * initialize display
* * add click listener
**************************************/

var TM = {};
TM.Ctrl = chrome.extension.getBackgroundPage().TM.Ctrl;
TM.Components = {};

$(function(){
// set click listener to each anchor
	for ( component in TM.Components )
	{
		$('#' + component).click(function(){
			if ( ! $(this).parent().hasClass('active') && $('.modal').length == 0 )
			{
				$(this).parent().addClass('active')
						.siblings()
						.removeClass('active');

				TM.Components[$(this).attr('id')].onClick();
			}
		});
	}

// add class active to li of list
	$('#list').parent().addClass('active');

// display tasks (by call click listener of list)
	TM.Components.list.onClick();
});
