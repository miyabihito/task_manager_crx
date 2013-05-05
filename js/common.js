/**************************************
*
* common.js
*
* prepare common settings
* * initialize display
* * add click listener
**************************************/

var TMCtrl = chrome.extension.getBackgroundPage().TMCtrl;
var TMComponents = {};

$(function(){
// set click listener to each anchor
	for ( component in TMComponents )
	{
		$('#' + component).click(function(){
			if ( ! $(this).parent().hasClass('active') && $('.modal').length == 0 )
			{
				$(this).parent().addClass('active')
						.siblings()
						.removeClass('active');

				TMComponents[$(this).attr('id')].onClick();
			}
		});
	}

// add class active to li of list
	$('#list').parent().addClass('active');

// display tasks (by call click listener of list)
	TMComponents.list.onClick();
});
