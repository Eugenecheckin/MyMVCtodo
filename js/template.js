(function (window) {
	'use strict';

	var escapesHTML = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\'': '&#x27;',
		'`': '&#x60;'
	};

	var escapeHtmlChar = function (chr) {
		return escapesHTML[chr];
	};	

	var unescapedHtml = /[&<>"'`]/g;
	var hasUnescapedHtml = new RegExp(unescapedHtml.source);

	var escape = function (str) {
		return (str && hasUnescapedHtml.test(str))
			? str.replace(unescapedHtml, escapeHtmlChar)
			: str;
	};

	/* default template from create View*/	 
	 
	function Template() {
		this.defaultTemplate
		=	'<li data-id="{{id}}" class="{{completed}}">'
		+		'<div class="view">'
		+			'<input class="toggle" type="checkbox" {{checked}}>'
		+			'<label>{{title}}</label>'
		+			'<button class="destroy"></button>'
		+		'</div>'
		+	'</li>';
	}

	/*
	 returns HTML String of <li> element
	 data has keys to replace(esceped).
	 view.show({id: 1, title: "NewItem",completed: 0, }....);
	 */
	Template.prototype.show = function (data) {
		var i, l;
		var view = '';	
		for (i = 0, l = data.length; i < l; i++) {		
			var template = this.defaultTemplate;
			var completed = '';
			var checked = '';
			if (data[i].completed) {
				completed = 'completed';
				checked = 'checked';
			}
			template = template.replace('{{id}}', data[i].id);
			template = template.replace('{{title}}', escape(data[i].title));
			template = template.replace('{{completed}}', completed);
			template = template.replace('{{checked}}', checked);

			view = view + template;
		}

		return view;
	};

	
	Template.prototype.itemCounter = function (activeTodos) {
		var count = activeTodos === 1 ? '' : 's';
		return '<strong>' + activeTodos + '</strong> item' + count + ' left';
	};

	/*completedTodos - count checked ToDos*/
	Template.prototype.clearCompletedButton = function (completedTodos) {
		if (completedTodos > 0) {
			return 'Clear completed';
		} 
		else {
			return '';
		}
	};

	window.app.Template = Template;
})(window);
 