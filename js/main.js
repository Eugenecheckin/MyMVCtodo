(function () {
	'use strict';
	/*name - name db in localStorage,
	initialize start application */
	function Todo(dbName) {
		this.storage = new app.Store(dbName);
		this.model = new app.Model(this.storage);
		this.template = new app.Template();
		this.view = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view);
	}

	var todo = new Todo('New');

	function setView() {
		todo.controller.setView(document.location.hash);
	}
	addEv(window, 'load', setView);
	addEv(window, 'hashchange', setView);
})();
