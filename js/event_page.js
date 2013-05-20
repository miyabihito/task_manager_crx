/**************************************
*
* event_page.js
*
**************************************/

var TM = {};
TM.Ctrl = {
	defaultTask : {
		id : '',
		title : '',
		detail : '',
		deadline : '',
		toggle : true,
		isCompleted : false,
	},
	taskList : {},
	listOrder : [],
	compOrder : [],
	trashOrder : [],
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
	getTrash : function() {
		var trash = [];
		for ( i=0 ; i < this.trashOrder.length ; i++ )
		{
			trash.push(this.taskList[ this.trashOrder[i] ]);
		}

		return trash;
	},
	addTask : function(newTask) {
		newTask.id = (new Date()).getTime();

		for ( var key in this.defaultTask )
		{
			if ( newTask[key] === undefined )
			{
				newTask[key] = this.defaultTask[key];
			}
		}

		this.taskList[newTask.id] = newTask;
		this.addList(newTask.id);

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
	deleteTask : function(id) {
		id = parseInt(id);

		delete this.taskList[id];
		this.saveTaskList();

		this.removeList(id)
			.removeComp(id)
			.removeTrash(id);
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
		if ( this.listOrder.indexOf(id) == -1 )
		{
			this.listOrder.unshift(id);
			this.saveListOrder();
			this.setBadgeText();
		}

		return this;
	},
	removeList : function(id) {
		id = parseInt(id);
		var index = this.listOrder.indexOf(id);
		if ( index != -1 )
		{
			this.listOrder.splice(index, 1);
			this.saveListOrder();

			this.setBadgeText();
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
		if ( this.compOrder.indexOf(id) == -1 )
		{
			this.compOrder.unshift(id);
			this.saveCompOrder();
		}

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
	setTrashOrder : function(trashOrder) {
		this.trashOrder = trashOrder;
		this.saveTrashOrder();

		return this;
	},
	addTrash : function(id) {
		id = parseInt(id);
		if ( this.trashOrder.indexOf(id) == -1 )
		{
			this.trashOrder.unshift(id);
			this.saveTrashOrder();
		}

		return this;
	},
	removeTrash : function(id) {
		id = parseInt(id);
		var index = this.trashOrder.indexOf(id);
		if ( index != -1 )
		{
			this.trashOrder.splice(index, 1);
			this.saveTrashOrder();
		}

		return this;
	},
	removeTaskToCompleted : function(id) {
		id = parseInt(id);

		var task = {};
		task.id = id;
		task.isCompleted = true;
		this.editTask(task);

		this.removeList(id)
			.removeTrash(id);
		this.addComp(id);

		return this;
	},
	removeTaskToList: function(id) {
		id = parseInt(id);
		this.removeComp(id)
			.removeTrash(id);
		this.addList(id);

		return this;
	},
	removeTaskToTrash: function(id) {
		id = parseInt(id);
		this.removeList(id)
			.removeComp(id);
		this.addTrash(id);

		return this;
	},
	loadFromStorage : function(key, callBack) {
		chrome.storage.local.get(key, function(items) {
			if ( items[key] )
			{
				TM.Ctrl[key] = items[key];
			}
			if ( callBack )
			{
				callBack();
			}
		});
	},
	loadTaskList : function() {
		var callBack = function() {
			for ( var id in TM.Ctrl.taskList )
			{
				for ( key in TM.Ctrl.defaultTask )
				{
					if ( TM.Ctrl.taskList[id][key] === undefined )
					{
						TM.Ctrl.taskList[id][key] = TM.Ctrl.defaultTask[key];
					}
				}
			}
		};
		this.loadFromStorage("taskList", callBack);
	},
	loadListOrder : function() {
		this.loadFromStorage("listOrder", this.setBadgeText);
	},
	loadCompOrder : function() {
		this.loadFromStorage("compOrder");
	},
	loadTrashOrder : function() {
		this.loadFromStorage("trashOrder");
	},
	saveToStorage : function(key) {
		var data = {};
		data[key] = TM.Ctrl[key];
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
	saveTrashOrder : function() {
		this.saveToStorage("trashOrder");

		return this;
	},
	setBadgeText : function() {
		var text = String(TM.Ctrl.listOrder.length);
		chrome.browserAction.setBadgeText({text : text});
	},
};


chrome.browserAction.onClicked.addListener( function() {
	if ( chrome.extension.getViews({type: "tab"}).length == 0 )
	{
		chrome.tabs.create({url: '../html/manager.html'}, function(tab){ TM.Tab = tab });
	}
	else
	{
		chrome.tabs.update(TM.Tab.id, { active : true });
	}
});


// Badge Color
chrome.browserAction.setBadgeBackgroundColor({color : [0, 102, 255, 255]});


// Context Menu
(function() {
	// add page's url as task
	var allMenu = {
		id : 'all',
		title : 'read this page later',
		contexts : ['all'],
		documentUrlPatterns : ['http://*/*', 'https://*/*'],
	};
	chrome.contextMenus.create(allMenu);

	chrome.contextMenus.onClicked.addListener(function(info, tab) {
		if ( info.menuItemId ==  allMenu.id )
		{
			var task = {};
			task.title = 'READ LATER';
			task.detail = 'PAGE TITLE: ' + tab.title + '\n'
				+ 'PAGE URL  : ' + info.pageUrl;
			TM.Ctrl.addTask(task);

			var views = chrome.extension.getViews({type : 'tab'});
			for ( var i = 0 ; i < views.length ; i++ )
			{
				if ( views[i].location.hash == '' || views[i].location.hash == '#list' )
				{
					views[i].location.reload();
				}
			}
		}
	});
}());


//init
TM.Ctrl.loadTaskList();
TM.Ctrl.loadListOrder();
TM.Ctrl.loadCompOrder();
TM.Ctrl.loadTrashOrder();
