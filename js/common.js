/*global NodeList */
(function (window) {
	'use strict';

	// Get element(s) by CSS selector:
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};
	window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};
	

	// addEventListener wrapper: 
	window.addEv = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};

	// Attach a handler to event for all elements that match the selector,
	// now or in the future, based on a root element
	window.attachEvent = function (target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}
		
		var useCapture = (type === 'blur' || type === 'focus');
		window.addEv(target, type, dispatchEvent, useCapture);
	};

	// Find the element's parent with the given tag name:
	// $parent(qs('a'), 'div');
	window.tagParent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toUpperCase() === tagName.toUpperCase()) {
			return element.parentNode;
		}
		return window.tagParent(element.parentNode, tagName);
	};

	// Add To Node Arrey.forEach
	// qsa('...').forEach(()=>{})
	NodeList.prototype.forEach = Array.prototype.forEach;
	
})(window);
