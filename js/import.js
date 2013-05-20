/**************************************
*
* import.js
*
* 
*
**************************************/

TM.Components.import = {};
TM.Components.import.onClick = function() {
	$.get(chrome.extension.getURL('/html/import.tpl'), function(template) {
		$('#content').html($.mustache(template));
	});
};
