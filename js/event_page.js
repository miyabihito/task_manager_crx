/**************************************
*
* event_page.js
*
**************************************/

var TMCtrl = {
	taskList : {},
	listOrder : [],
	compOrder : [],
	getTask : function(id) {
		id = parseInt(id);
		return this.taskList[id];
	},
	getList : function() {
		var tasks = [];
		for ( i=0 ; i < this.listOrder.length ; i++ )
		{
			tasks.push(this.taskList[ this.listOrder[i] ]);
		}

		return tasks;
	},
	getComp : function() {
		var comps = [];
		for ( i=0 ; i < this.compOrder.length ; i++ )
		{
			comps.push(this.taskList[ this.compOrder[i] ]);
		}

		return comps;
	},
	addTask : function(newTask) {
		var task = {
			id : (new Date()).getTime(),
			title : '',
			detail : '',
			deadline : '',
			toggle : true,
		};

		for ( var key in task )
		{
			if ( newTask[key] !== undefined )
			{
				task[key] = newTask[key];
			}
		}

		this.taskList[task.id] = task;
		this.addList(task.id);

		this.saveTaskList().saveListOrder();
		return this;
	},
	editTask : function(task) {
		id = parseInt(task.id);
		var storedTask = this.getTask(id);
		for ( var key in storedTask )
		{
			if ( task[key] !== undefined )
			{
				storedTask[key] = task[key];
			}
		}

		this.taskList[id] = storedTask;
		this.saveTaskList();
	},
	toggleTask : function(id) {
		id = parseInt(id);
		var task = this.getTask(id);
		task.toggle = task.toggle ? false : true;
		this.taskList[id] = task;
		this.saveTaskList();
	},
	setListOrder : function(listOrder) {
		this.listOrder = listOrder;
		this.saveListOrder();

		return this;
	},
	addList : function(id) {
		id = parseInt(id);
		this.listOrder.unshift(id);
		this.saveListOrder();

		return this;
	},
	removeList : function(id) {
		id = parseInt(id);
		var index = this.listOrder.indexOf(id);
		if ( index != -1 )
		{
			this.listOrder.splice(index, 1);
			this.saveListOrder();
		}

		return this;
	},
	setCompOrder : function(compOrder) {
		this.compOrder = compOrder;
		this.saveCompOrder();

		return this;
	},
	addComp : function(id) {
		id = parseInt(id);
		this.compOrder.unshift(id);
		this.saveCompOrder();

		return this;
	},
	removeComp : function(id) {
		id = parseInt(id);
		var index = this.compOrder.indexOf(id);
		if ( index != -1 )
		{
			this.compOrder.splice(index, 1);
			this.saveCompOrder();
		}

		return this;
	},
	completeTask : function(id) {
		id = parseInt(id);
		this.removeList(id).addComp(id);

		return this;
	},
	removeTaskToList: function(id) {
		id = parseInt(id);
		this.removeComp(id);
		this.addList(id);

		return this;
	},
	removeTaskToTrash: function(id) {
		id = parseInt(id);

		this.removeList(id)
			.removeComp(id);

// add task to trash

		return this;
	},
	loadFromStorage : function(key) {
		chrome.storage.local.get(key, function(items) {
			if ( items[key] )
			{
				TMCtrl[key] = items[key];
			}
		});
	},
	loadTaskList : function() {
// adding new property to task in new version,
// check key here (hasOwnProperty)
		this.loadFromStorage("taskList");
	},
	loadListOrder : function() {
		this.loadFromStorage("listOrder");
	},
	loadCompOrder : function() {
		this.loadFromStorage("compOrder");
	},
	saveToStorage : function(key) {
		var data = {};
		data[key] = TMCtrl[key];
		chrome.storage.local.set(data);
	},
	saveTaskList : function() {
		this.saveToStorage("taskList");

		return this;
	},
	saveListOrder : function() {
		this.saveToStorage("listOrder");

		return this;
	},
	saveCompOrder : function() {
		this.saveToStorage("compOrder");

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
		chrome.tabs.update(TMTab.id, { active : true });
	}
});



//init
TMCtrl.loadTaskList();
TMCtrl.loadListOrder();
TMCtrl.loadCompOrder();

