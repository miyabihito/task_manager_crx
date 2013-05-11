<ul id="sortable" class="unstyled">
{{#task_list}}
<li>
<div class="well tm-task" id="{{id}}">
	<div>
		<div class="row">
			<div class="span9"><h2>{{title}}</h2></div>
		</div>
	</div>
	{{#toggle}}
	<div class="tm-toggle">
	{{/toggle}}
	{{^toggle}}
	<div class="tm-toggle tm-toggle-off">
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
