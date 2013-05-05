/**************************************
*
* event_page.js
*
**************************************/

var TMCtrl = {
	taskList : null,
	taskOrder : null,
	getTask : function(id) {
		id = parseInt(id);
		return this.taskList[id];
	},
	getTaskList : function() {
		var tasks = [];
		for ( i=0 ; i < this.taskOrder.length ; i++ )
		{
// adding new property to task in new version,
// check key here (hasOwnProperty)
			tasks.push(this.taskList[ this.taskOrder[i] ]);
		}

		return tasks;
	},
	addTask : function(newTask) {
		var task = {
			id : null,
			title : '',
			detail : '',
			deadline : '',
			toggle : true,
		};
		task.id = (new Date()).getTime();

		for ( var key in task )
		{
			if ( newTask[key] !== undefined )
			{
				task[key] = newTask[key];
			}
		}

		this.taskList[task.id] = task;
		this.taskOrder.unshift(task.id);

		this.saveTaskList().saveTaskOrder();
		return this;
	},
	editTask : function(task) {
		var storedTask = this.getTask(task.id);
		storedTask.title = task.title;
		storedTask.detail = task.detail;
		storedTask.deadline = task.deadline;

		this.taskList[task.id] = storedTask;
		this.saveTaskList();
	},
	toggleTask : function(id) {
		var task = this.getTask(id);
		task.toggle = task.toggle ? false : true;
		this.taskList[id] = task;
		this.saveTaskList();
	},
	removeTaskToTrash: function(id) {
		id = parseInt(id);
// move to trash

// delete task from task list
		delete this.taskList[id];
		var index = this.taskOrder.indexOf(id);
		this.taskOrder.splice(index, 1);

		this.saveTaskList().saveTaskOrder();

		return this;
	},
	setTaskOrder : function(taskOrder) {
		this.taskOrder = taskOrder;
		this.saveTaskOrder();

		return this;
	},
	loadTaskList : function() {
		chrome.storage.local.get("taskList", function(items) {
			if ( items.taskList )
			{
				TMCtrl.taskList = items.taskList;
			}
			else
			{
				TMCtrl.taskList = {};
			}
		});
	},
	loadTaskOrder : function() {
		chrome.storage.local.get("taskOrder", function(items) {
			if ( items.taskOrder )
			{
				TMCtrl.taskOrder = items.taskOrder;
			}
			else
			{
				TMCtrl.taskOrder = [];
			}
		});

	},
	saveTaskList : function() {
		chrome.storage.local.set({"taskList": TMCtrl.taskList});
		return this;
	},
	saveTaskOrder : function() {
		chrome.storage.local.set({"taskOrder": TMCtrl.taskOrder});
		return this;
	},
};


var TMTab;
chrome.browserAction.onClicked.addListener( function() {
	if ( chrome.extension.getViews({type: "tab"}).length == 0 )
	{
		chrome.tabs.create({url: '../html/manager.html'}, function(tab){ TMTab = tab });
	}
	else
	{
		chrome.tabs.update(TMCtrl.tab.id, { active : true });
	}
});




//init
TMCtrl.loadTaskList();
TMCtrl.loadTaskOrder();

