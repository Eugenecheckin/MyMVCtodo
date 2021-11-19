(function (window) {
	'use strict';

	/* create(or return) from storage by app.js -  "db name" */
	function Store(name) {
		this.dbName = name;

		if (!localStorage.getItem(name)) {
			var todos = [];
			localStorage.setItem(name, JSON.stringify(todos));
		}
	}

	/* get item from localstorage by query */
	Store.prototype.find = function (query, callback) {
		if (!callback) {
			return;
		}

		var todos = JSON.parse(localStorage.getItem(this.dbName));

		callback.call(this, todos.filter(function (todo) {
			for (var q in query) {
				if (query[q] !== todo[q]) {
					return false;
				}
			}
			return true;
		}));
	};

	/* get all todos from localstorage */
	Store.prototype.findAll = function (callback) {
		callback = callback || function () {};
		callback.call(this, JSON.parse(localStorage.getItem(this.dbName)));
	};

	/* save new or update exist data(if enter id) to localstorage*/
	Store.prototype.save = function (newData, callback, id) {
		var todos = JSON.parse(localStorage.getItem(this.dbName));
		callback = callback || function() {};
		
		if (id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					for (var key in newData) {
						todos[i][key] = newData[key];
					}
					break;
				}
			}

			localStorage.setItem(this.dbName, JSON.stringify(todos));
			callback.call(this, todos);
		} else {
			
			newData.id = new Date().getTime();
			todos.push(newData);
			localStorage.setItem(this.dbName, JSON.stringify(todos));
			callback.call(this, [newData]);
		}
	};

	/* remove item by item.id */
	Store.prototype.remove = function (id, callback) {
		var todos = JSON.parse(localStorage.getItem(this.dbName));

		for (var i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				todos.splice(i, 1);
				break;
			}
		}

		localStorage.setItem(this.dbName, JSON.stringify(todos));
		callback.call(this, todos);
	};

	/* clear all item */
	Store.prototype.removeAll = function (callback) {
		var todos = [];
		localStorage.setItem(this.dbName, JSON.stringify(todos));
		callback.call(this, todos);
	};
	
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
