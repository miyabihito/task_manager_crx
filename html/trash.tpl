<ul id="sortable" class="unstyled">
{{#trash_list}}
<li>
<div class="well tm-task" id="{{id}}">
	<div>
		<div class="row">
			<div class="span9">
				{{#isCompleted}}
					<span class="label label-success">COMPLETED</span>
				{{/isCompleted}}
				{{^isCompleted}}
					<span class="label label-important">INCOMPLETED</span>
				{{/isCompleted}}
				<h2>{{title}}</h2>
			</div>
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
			<div class="span2 offset4 tm-task-btn"><a href="#" class="btn tm-task-return-btn"><i class="icon-arrow-up"></i> RETURN</a></div>
			<div class="span2 tm-task-btn"><a href="#" class="btn tm-task-delete-btn"><i class="icon-remove-circle"></i> DELETE</a></div>
		</div>
		<pre class="tm-detail">{{detail}}</pre>
	</div>
</div>
</li>
{{/trash_list}}
</ul>
{{^trash_list}}
<div class="well">
	<h2>No trash task.</h2>
</div>
{{/trash_list}}
