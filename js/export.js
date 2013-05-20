/**************************************
*
* export.js
*
* 
*
**************************************/

TM.Components.export = {};
TM.Components.export.onClick = function() {
	$.get(chrome.extension.getURL('/html/export.tpl'), function(template) {
		$('#content').html($.mustache(template));
	});
};
