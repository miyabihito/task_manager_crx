<ul id="sortable" class="unstyled">
{{#task_list}}
<li>
<div class="well tm-task" id="{{id}}">
	<div>
		<div class="row">
			<div class="span9"><h2>{{title}}</h2></div>
			<span class="handle ui-icon ui-icon-arrowthick-2-n-s ui-corner-all ui-state-default"></span>
			{{#toggle}}
			<span class="tm-toggle ui-icon ui-icon-triangle-1-n ui-corner-all ui-state-default"></span>
			{{/toggle}}
			{{^toggle}}
			<span class="tm-toggle ui-icon ui-icon-triangle-1-s ui-corner-all ui-state-default"></span>
			{{/toggle}}
		</div>
	</div>
	{{#toggle}}
	<div class="tm-toggle-target">
	{{/toggle}}
	{{^toggle}}
	<div class="tm-toggle-target tm-toggle-off">
	{{/toggle}}
		<div class="row">
			<div class="span2"><i class="icon-calendar"></i>{{deadline}}</div>
			<div class="span2 tm-task-btn offset3"><a href="#" class="btn tm-task-edit-btn"><i class="icon-edit"></i> EDIT</a></div>
			<div class="span2 tm-task-btn"><a href="#" class="btn tm-task-comp-btn"><i class="icon-thumbs-up"></i> COMP</a></div>
			<div class="span2 tm-task-btn"><a href="#" class="btn tm-task-trash-btn"><i class="icon-trash"></i>TRASH</a></div>
		</div>
		<pre class="tm-detail">{{detail}}</pre>
	</div>
</div>
</li>
{{/task_list}}
</ul>
{{^task_list}}
<div class="well">
	<h2>No listed task.</h2>
</div>
{{/task_list}}
