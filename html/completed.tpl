<ul id="sortable" class="unstyled">
{{#comp_list}}
<li>
<div class="well tm-task" id="{{id}}">
	<div>
		<div class="row">
			<div class="span5"><h2>{{title}}</h2></div>
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
			<div class="span2 offset4 tm-task-btn"><a href="#" class="btn tm-task-return-btn"><i class="icon-thumbs-down"></i> RETURN</a></div>
			<div class="span2 tm-task-btn"><a href="#" class="btn tm-task-trash-btn"><i class="icon-trash"></i> TRASH</a></div>
		</div>
		<pre class="tm-detail">{{detail}}</pre>
	</div>
</div>
</li>
{{/comp_list}}
</ul>
{{^comp_list}}
<div class="well">
	<h2>No completed task.</h2>
</div>
{{/comp_list}}
