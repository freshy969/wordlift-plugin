!function(t){function c(e){if(d[e])return d[e].exports;var n=d[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}var d={};c.m=t,c.c=d,c.i=function(t){return t},c.d=function(t,d,e){c.o(t,d)||Object.defineProperty(t,d,{configurable:!1,enumerable:!0,get:e})},c.n=function(t){var d=t&&t.__esModule?function(){return t.default}:function(){return t};return c.d(d,"a",d),d},c.o=function(t,c){return Object.prototype.hasOwnProperty.call(t,c)},c.p="",c(c.s=116)}({101:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/* harmony export (immutable) */ __webpack_exports__[\"a\"] = check;\n/**\n * Check for duplicate titles.\n *\n * @since 3.10.0\n *\n * @param {Object} $ A jQuery instance.\n * @param {Object} ajax A `wp.ajax` class used to perform `post` requests to `admin-ajax.php`.\n * @param {String} title The title to check for duplicates.\n * @param {Number} postId The current post id, excluded from the duplicates results.\n * @param {String} message The error message to display in case there are duplicates.\n * @param {Function} callback A callback function to call to deliver the results.\n */\n\nfunction check($, ajax, title, postId, message, callback) {\n\t// Use `wp.ajax` to post a request to find an existing entity with the specified title.\n\tajax.post('entity_by_title', { title: title }).done(function (response) {\n\t\t// Prepare the html code to show in the error div.\n\t\tvar html = $.map(response.results, function (item) {\n\t\t\t// If the item is the current post, ignore it.\n\t\t\tif (item.id === postId) {\n\t\t\t\treturn '';\n\t\t\t}\n\n\t\t\t// Create the edit link.\n\t\t\tvar editLink = response.edit_link.replace('%d', item.id);\n\n\t\t\t// Return the html code.\n\t\t\treturn message + '<a target=\"_blank\" href=\"' + editLink + '\">' + item.title + '</a><br />';\n\t\t}).join(''); // Join the html codes together.\n\n\t\t// Call the callback function.\n\t\tcallback(html);\n\t});\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTAxLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hZG1pbi9qcy9tb2R1bGVzL2NoZWNrLmpzPzA5NzkiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDaGVjayBmb3IgZHVwbGljYXRlIHRpdGxlcy5cbiAqXG4gKiBAc2luY2UgMy4xMC4wXG4gKlxuICogQHBhcmFtIHtPYmplY3R9ICQgQSBqUXVlcnkgaW5zdGFuY2UuXG4gKiBAcGFyYW0ge09iamVjdH0gYWpheCBBIGB3cC5hamF4YCBjbGFzcyB1c2VkIHRvIHBlcmZvcm0gYHBvc3RgIHJlcXVlc3RzIHRvIGBhZG1pbi1hamF4LnBocGAuXG4gKiBAcGFyYW0ge1N0cmluZ30gdGl0bGUgVGhlIHRpdGxlIHRvIGNoZWNrIGZvciBkdXBsaWNhdGVzLlxuICogQHBhcmFtIHtOdW1iZXJ9IHBvc3RJZCBUaGUgY3VycmVudCBwb3N0IGlkLCBleGNsdWRlZCBmcm9tIHRoZSBkdXBsaWNhdGVzIHJlc3VsdHMuXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZSB0byBkaXNwbGF5IGluIGNhc2UgdGhlcmUgYXJlIGR1cGxpY2F0ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGNhbGwgdG8gZGVsaXZlciB0aGUgcmVzdWx0cy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVjayggJCwgYWpheCwgdGl0bGUsIHBvc3RJZCwgbWVzc2FnZSwgY2FsbGJhY2sgKSB7XG5cdC8vIFVzZSBgd3AuYWpheGAgdG8gcG9zdCBhIHJlcXVlc3QgdG8gZmluZCBhbiBleGlzdGluZyBlbnRpdHkgd2l0aCB0aGUgc3BlY2lmaWVkIHRpdGxlLlxuXHRhamF4LnBvc3QoICdlbnRpdHlfYnlfdGl0bGUnLCB7IHRpdGxlOiB0aXRsZSB9ICkuZG9uZSggZnVuY3Rpb24oIHJlc3BvbnNlICkge1xuXHRcdC8vIFByZXBhcmUgdGhlIGh0bWwgY29kZSB0byBzaG93IGluIHRoZSBlcnJvciBkaXYuXG5cdFx0Y29uc3QgaHRtbCA9ICQubWFwKCByZXNwb25zZS5yZXN1bHRzLCBmdW5jdGlvbiggaXRlbSApIHtcblx0XHRcdC8vIElmIHRoZSBpdGVtIGlzIHRoZSBjdXJyZW50IHBvc3QsIGlnbm9yZSBpdC5cblx0XHRcdGlmICggaXRlbS5pZCA9PT0gcG9zdElkICkge1xuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENyZWF0ZSB0aGUgZWRpdCBsaW5rLlxuXHRcdFx0Y29uc3QgZWRpdExpbmsgPSByZXNwb25zZS5lZGl0X2xpbmsucmVwbGFjZSggJyVkJywgaXRlbS5pZCApO1xuXG5cdFx0XHQvLyBSZXR1cm4gdGhlIGh0bWwgY29kZS5cblx0XHRcdHJldHVybiBtZXNzYWdlICsgJzxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCInICsgZWRpdExpbmsgKyAnXCI+JyArXG5cdFx0XHRcdCAgIGl0ZW0udGl0bGUgKyAnPC9hPjxiciAvPic7XG5cdFx0fSApLmpvaW4oICcnICk7IC8vIEpvaW4gdGhlIGh0bWwgY29kZXMgdG9nZXRoZXIuXG5cblx0XHQvLyBDYWxsIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cblx0XHRjYWxsYmFjayggaHRtbCApO1xuXHR9ICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2FkbWluL2pzL21vZHVsZXMvY2hlY2suanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=")},102:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/* harmony export (immutable) */ __webpack_exports__[\"a\"] = delay;\n/**\n * Delay a function call by half a second.\n *\n * Any function can be delayed using `delay`. The timeout for the call is bound\n * to the provided element. If another function call is delayed on the same\n * element, any previous timeout is cancelled.\n *\n * This function is used to validate in real-time inputs when the user presses a\n * key, but allowing the user to press more keys (hence the delay).\n *\n * @since 3.9.0\n *\n * @param {Object} $elem A jQuery element reference which will hold the timeout\n *                       reference.\n * @param {Function} fn The function to call.\n * @param {...} args Parameters to pass to the callback.\n */\n\nfunction delay($elem, fn) {\n  // Clear a validation timeout.\n  clearTimeout($elem.data('timeout'));\n\n  // Validate the key, after a delay, so that another key is pressed, this\n  // validation is cancelled.\n\n  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    args[_key - 2] = arguments[_key];\n  }\n\n  $elem.data('timeout', setTimeout.apply(undefined, [fn, 500].concat(args)));\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTAyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hZG1pbi9qcy9tb2R1bGVzL2RlbGF5LmpzPzIyNWUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEZWxheSBhIGZ1bmN0aW9uIGNhbGwgYnkgaGFsZiBhIHNlY29uZC5cbiAqXG4gKiBBbnkgZnVuY3Rpb24gY2FuIGJlIGRlbGF5ZWQgdXNpbmcgYGRlbGF5YC4gVGhlIHRpbWVvdXQgZm9yIHRoZSBjYWxsIGlzIGJvdW5kXG4gKiB0byB0aGUgcHJvdmlkZWQgZWxlbWVudC4gSWYgYW5vdGhlciBmdW5jdGlvbiBjYWxsIGlzIGRlbGF5ZWQgb24gdGhlIHNhbWVcbiAqIGVsZW1lbnQsIGFueSBwcmV2aW91cyB0aW1lb3V0IGlzIGNhbmNlbGxlZC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gdmFsaWRhdGUgaW4gcmVhbC10aW1lIGlucHV0cyB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYVxuICoga2V5LCBidXQgYWxsb3dpbmcgdGhlIHVzZXIgdG8gcHJlc3MgbW9yZSBrZXlzIChoZW5jZSB0aGUgZGVsYXkpLlxuICpcbiAqIEBzaW5jZSAzLjkuMFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSAkZWxlbSBBIGpRdWVyeSBlbGVtZW50IHJlZmVyZW5jZSB3aGljaCB3aWxsIGhvbGQgdGhlIHRpbWVvdXRcbiAqICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbC5cbiAqIEBwYXJhbSB7Li4ufSBhcmdzIFBhcmFtZXRlcnMgdG8gcGFzcyB0byB0aGUgY2FsbGJhY2suXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVsYXkoICRlbGVtLCBmbiwgLi4uYXJncyApIHtcblx0Ly8gQ2xlYXIgYSB2YWxpZGF0aW9uIHRpbWVvdXQuXG5cdGNsZWFyVGltZW91dCggJGVsZW0uZGF0YSggJ3RpbWVvdXQnICkgKTtcblxuXHQvLyBWYWxpZGF0ZSB0aGUga2V5LCBhZnRlciBhIGRlbGF5LCBzbyB0aGF0IGFub3RoZXIga2V5IGlzIHByZXNzZWQsIHRoaXNcblx0Ly8gdmFsaWRhdGlvbiBpcyBjYW5jZWxsZWQuXG5cdCRlbGVtLmRhdGEoICd0aW1lb3V0Jywgc2V0VGltZW91dCggZm4sIDUwMCwgLi4uYXJncyApICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2FkbWluL2pzL21vZHVsZXMvZGVsYXkuanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQUE7QUFBQTtBQUNBO0FBS0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==")},103:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("window.wp = window.wp || {};\nwindow.wp.wordlift = window.wp.wordlift || {};\n\nif (typeof window.wp.wordlift.trigger === 'undefined') {\n\t_.extend(window.wp.wordlift, Backbone.Events);\n}\n\n/* unused harmony default export */ var _unused_webpack_default_export = (window.wp.wordlift);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTAzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hZG1pbi9qcy9tb2R1bGVzL3dvcmRsaWZ0LmpzP2I1ZTIiXSwic291cmNlc0NvbnRlbnQiOlsid2luZG93LndwID0gd2luZG93LndwIHx8IHt9O1xud2luZG93LndwLndvcmRsaWZ0ID0gd2luZG93LndwLndvcmRsaWZ0IHx8IHt9O1xuXG5pZiAoIHR5cGVvZiB3aW5kb3cud3Aud29yZGxpZnQudHJpZ2dlciA9PT0gJ3VuZGVmaW5lZCcgKSB7XG5cdF8uZXh0ZW5kKCB3aW5kb3cud3Aud29yZGxpZnQsIEJhY2tib25lLkV2ZW50cyApO1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aW5kb3cud3Aud29yZGxpZnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2FkbWluL2pzL21vZHVsZXMvd29yZGxpZnQuanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=")},116:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_wordlift__ = __webpack_require__(103);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_delay__ = __webpack_require__(102);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_check__ = __webpack_require__(101);\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n/**\n * Define our global hooks.\n *\n * @since 3.0.0\n */\n\n/**\n * Internal dependencies\n */\n// eslint-disable-next-line no-unused-vars\n\n\n\n\n(function ($) {\n\t/**\n  * Execute when the document is ready.\n  *\n  * @since 3.1.0\n  */\n\t$(function () {\n\t\t// The Entity Types Taxonomy is exclusive, one cannot choose more\n\t\t// than a type. Therefore from the PHP code we provide a Walker\n\t\t// that changes checkboxes into radios. However the quickedit on the\n\t\t// client side is applied only to checkboxes, so we override the\n\t\t// function here to apply the selection also to radios.\n\n\t\t// Do not hook, if we're not on a page with the inlineEditPost.\n\t\tif ('undefined' === typeof inlineEditPost || null === inlineEditPost) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Create a reference to the original function.\n\t\tvar fnEdit = inlineEditPost.edit;\n\n\t\t// Override the edit function.\n\t\tinlineEditPost.edit = function (id) {\n\t\t\t// Call the original function.\n\t\t\tfnEdit.apply(this, arguments);\n\n\t\t\t// Get the id (this is a copy of what happens in the original\n\t\t\t// edit function).\n\t\t\tif ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) === 'object') {\n\t\t\t\tid = this.getId(id);\n\t\t\t}\n\n\t\t\t// Get a reference to the row data (holding the post data) and\n\t\t\t// to the newly displayed inline edit row.\n\t\t\tvar rowData = $('#inline_' + id);\n\t\t\tvar editRow = $('#edit-' + id);\n\n\t\t\t// Select the terms for the taxonomy (this is a copy of the\n\t\t\t// original lines in the edit function but we're targeting\n\t\t\t// radios instead of checkboxes).\n\t\t\t$('.post_category', rowData).each(function () {\n\t\t\t\tvar terms = $(this).text();\n\n\t\t\t\tif (terms) {\n\t\t\t\t\tvar taxname = $(this).attr('id').replace('_' + id, '');\n\t\t\t\t\t// Target radios (instead of checkboxes).\n\t\t\t\t\t$('ul.' + taxname + '-checklist :radio', editRow).val(terms.split(','));\n\t\t\t\t}\n\t\t\t});\n\t\t};\n\t});\n\n\t/**\n  * Handle the alternative labels, by providing an 'Add more titles'\n  * button and input texts where to add the labels.\n  *\n  * @since 3.2.0\n  */\n\t$(function () {\n\t\t// Add the delete button to the existing input texts.\n\t\t$('.wl-alternative-label > .wl-delete-button').on('click', function (event) {\n\t\t\t$(event.delegateTarget).parent().remove();\n\t\t});\n\n\t\t// Handle the click on the 'Add more titles' button and bind the\n\t\t// event of the (new) delete button.\n\t\t$('#wl-add-alternative-labels-button').on('click', function (event) {\n\t\t\t$(event.delegateTarget).before(function () {\n\t\t\t\tvar $element = $($('#wl-tmpl-alternative-label-input').html());\n\t\t\t\t$element.children('.wl-delete-button').on('click', function () {\n\t\t\t\t\t$element.remove();\n\t\t\t\t});\n\t\t\t\treturn $element;\n\t\t\t});\n\t\t});\n\t});\n\n\t/**\n  * Check for duplicate title/labels via AJAX while the user is typing.\n  *\n  * @since 3.2.0\n  */\n\t$(function () {\n\t\t// return if we are not in the entity editor page (the *wlSettings*\n\t\t// json is only enqueued there) wlSettings.entityBeingEdited comes\n\t\t// from `wp_localize_script`, so '1' (true) or '' (false).\n\t\tif (typeof wlSettings === 'undefined' || '1' !== wlSettings.entityBeingEdited) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Print error message in page and hide it.\n\t\tvar duplicatedEntityErrorDiv = $('<div class=\"wl-notice notice wl-suggestion\"' + ' id=\"wl-same-title-error\" ><p></p></div>').insertBefore('div.wrap [name=post]').hide();\n\n\t\t/**\n   * Check whether the specified title is already used by other\n   * entities.\n   *\n   * @since 3.10.0\n   */\n\t\tvar callback = function callback() {\n\t\t\t// A jQuery reference to the element firing the event.\n\t\t\tvar $this = $(this);\n\n\t\t\t// Delay execution of the check.\n\t\t\t__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__modules_delay__[\"a\" /* default */])($this, __WEBPACK_IMPORTED_MODULE_2__modules_check__[\"a\" /* default */], $, wp.ajax, $this.val(), wlSettings.post_id, wlSettings.l10n['You already published an entity with the same name'], function (html) {\n\t\t\t\t// Set the error div content.\n\t\t\t\t$('#wl-same-title-error p').html(html);\n\n\t\t\t\t// If the html code isn't empty then show the error.\n\t\t\t\tif ('' !== html) {\n\t\t\t\t\tduplicatedEntityErrorDiv.show();\n\t\t\t\t} else {\n\t\t\t\t\t// If the html code is empty, hide the error div.\n\t\t\t\t\tduplicatedEntityErrorDiv.hide();\n\t\t\t\t}\n\t\t\t});\n\t\t};\n\n\t\t// Whenever something happens in the entity title...\n\t\t$('[name=post_title]').on('change paste keyup', callback).each(callback);\n\t});\n\n\t/**\n  * Draw dashboard if needed\n  *\n  * @since 3.4.0\n  */\n\t$(function () {\n\t\t// return if not needed\n\t\tif (!$('#wl-dashboard-widget-inner-wrapper').length) {\n\t\t\treturn;\n\t\t}\n\n\t\t$.getJSON(ajaxurl + '?action=wordlift_get_stats', function (stats) {\n\t\t\t// Get the triples, 0 by default if triples is not a number.\n\t\t\tvar triples = isNaN(stats.triples) ? 0 : stats.triples;\n\n\t\t\t// Calculate wikidata ratio\n\t\t\t// TODO percentage should be added via css\n\t\t\tvar percent = triples * 100 / 947690143;\n\t\t\tstats.wikidata = percent.toFixed(5) + '%';\n\t\t\t// Calculate annotated posts ratio\n\t\t\tvar annotated = stats.annotated_posts * 100 / stats.posts;\n\t\t\tstats.annotatedPostsPercentage = annotated.toFixed(1);\n\t\t\t// Convert NaN to zero if needed\n\t\t\t//\n\t\t\t// See https://github.com/insideout10/wordlift-plugin/issues/269\n\t\t\tstats.annotatedPostsPercentage = stats.annotatedPostsPercentage || 0;\n\t\t\t// TODO percentage should be added via css\n\t\t\tstats.annotatedPostsPercentage = stats.annotatedPostsPercentage + '%';\n\n\t\t\t// Populate annotated posts pie chart\n\t\t\t$('#wl-posts-pie-chart circle').css('stroke-dasharray', stats.annotated_posts * 100 / stats.posts + ' 100');\n\t\t\t// Populate avarage entity ratings gauge chart\n\t\t\t$('#wl-entities-gauge-chart .stat').css('stroke-dasharray', stats.rating / 2 + ' 100');\n\n\t\t\t// TODO percentage should be added via css\n\t\t\tstats.rating = stats.rating + '%';\n\t\t\t// populate value placeholders\n\t\t\tfor (var property in stats) {\n\t\t\t\t$('#wl-dashboard-widget-' + property).text(stats[property]);\n\t\t\t}\n\n\t\t\t// Finally show the widget\n\t\t\t$('#wl-dashboard-widget-inner-wrapper').show();\n\n\t\t\t// Set the same height for stat graph wrappers\n\t\t\t// Links not working with css alternatives\n\t\t\tvar minHeight = 0;\n\t\t\t$('.wl-stat-graph-wrapper').each(function () {\n\t\t\t\tvar stat = $(this);\n\t\t\t\tif (stat.height() > minHeight) {\n\t\t\t\t\tminHeight = stat.height();\n\t\t\t\t}\n\t\t\t});\n\n\t\t\t$('.wl-stat-graph-wrapper').css('min-height', minHeight);\n\t\t});\n\t});\n})(jQuery);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTE2LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hZG1pbi9qcy93b3JkbGlmdC1hZG1pbi5qcz8yMDRiIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGVmaW5lIG91ciBnbG9iYWwgaG9va3MuXG4gKlxuICogQHNpbmNlIDMuMC4wXG4gKi9cblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgd29yZGxpZnQgZnJvbSAnLi9tb2R1bGVzL3dvcmRsaWZ0JztcbmltcG9ydCBkZWxheSBmcm9tICcuL21vZHVsZXMvZGVsYXknO1xuaW1wb3J0IGNoZWNrIGZyb20gJy4vbW9kdWxlcy9jaGVjayc7XG5cbihcblx0ZnVuY3Rpb24oICQgKSB7XG5cdFx0LyoqXG5cdFx0ICogRXhlY3V0ZSB3aGVuIHRoZSBkb2N1bWVudCBpcyByZWFkeS5cblx0XHQgKlxuXHRcdCAqIEBzaW5jZSAzLjEuMFxuXHRcdCAqL1xuXHRcdCQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gVGhlIEVudGl0eSBUeXBlcyBUYXhvbm9teSBpcyBleGNsdXNpdmUsIG9uZSBjYW5ub3QgY2hvb3NlIG1vcmVcblx0XHRcdC8vIHRoYW4gYSB0eXBlLiBUaGVyZWZvcmUgZnJvbSB0aGUgUEhQIGNvZGUgd2UgcHJvdmlkZSBhIFdhbGtlclxuXHRcdFx0Ly8gdGhhdCBjaGFuZ2VzIGNoZWNrYm94ZXMgaW50byByYWRpb3MuIEhvd2V2ZXIgdGhlIHF1aWNrZWRpdCBvbiB0aGVcblx0XHRcdC8vIGNsaWVudCBzaWRlIGlzIGFwcGxpZWQgb25seSB0byBjaGVja2JveGVzLCBzbyB3ZSBvdmVycmlkZSB0aGVcblx0XHRcdC8vIGZ1bmN0aW9uIGhlcmUgdG8gYXBwbHkgdGhlIHNlbGVjdGlvbiBhbHNvIHRvIHJhZGlvcy5cblxuXHRcdFx0Ly8gRG8gbm90IGhvb2ssIGlmIHdlJ3JlIG5vdCBvbiBhIHBhZ2Ugd2l0aCB0aGUgaW5saW5lRWRpdFBvc3QuXG5cdFx0XHRpZiAoICd1bmRlZmluZWQnID09PSB0eXBlb2YgaW5saW5lRWRpdFBvc3QgfHwgbnVsbCA9PT0gaW5saW5lRWRpdFBvc3QgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ3JlYXRlIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi5cblx0XHRcdGNvbnN0IGZuRWRpdCA9IGlubGluZUVkaXRQb3N0LmVkaXQ7XG5cblx0XHRcdC8vIE92ZXJyaWRlIHRoZSBlZGl0IGZ1bmN0aW9uLlxuXHRcdFx0aW5saW5lRWRpdFBvc3QuZWRpdCA9IGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdFx0Ly8gQ2FsbCB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXG5cdFx0XHRcdGZuRWRpdC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cblx0XHRcdFx0Ly8gR2V0IHRoZSBpZCAodGhpcyBpcyBhIGNvcHkgb2Ygd2hhdCBoYXBwZW5zIGluIHRoZSBvcmlnaW5hbFxuXHRcdFx0XHQvLyBlZGl0IGZ1bmN0aW9uKS5cblx0XHRcdFx0aWYgKCB0eXBlb2YoXG5cdFx0XHRcdFx0XHRpZFxuXHRcdFx0XHRcdCkgPT09ICdvYmplY3QnICkge1xuXHRcdFx0XHRcdGlkID0gdGhpcy5nZXRJZCggaWQgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEdldCBhIHJlZmVyZW5jZSB0byB0aGUgcm93IGRhdGEgKGhvbGRpbmcgdGhlIHBvc3QgZGF0YSkgYW5kXG5cdFx0XHRcdC8vIHRvIHRoZSBuZXdseSBkaXNwbGF5ZWQgaW5saW5lIGVkaXQgcm93LlxuXHRcdFx0XHRjb25zdCByb3dEYXRhID0gJCggJyNpbmxpbmVfJyArIGlkICk7XG5cdFx0XHRcdGNvbnN0IGVkaXRSb3cgPSAkKCAnI2VkaXQtJyArIGlkICk7XG5cblx0XHRcdFx0Ly8gU2VsZWN0IHRoZSB0ZXJtcyBmb3IgdGhlIHRheG9ub215ICh0aGlzIGlzIGEgY29weSBvZiB0aGVcblx0XHRcdFx0Ly8gb3JpZ2luYWwgbGluZXMgaW4gdGhlIGVkaXQgZnVuY3Rpb24gYnV0IHdlJ3JlIHRhcmdldGluZ1xuXHRcdFx0XHQvLyByYWRpb3MgaW5zdGVhZCBvZiBjaGVja2JveGVzKS5cblx0XHRcdFx0JCggJy5wb3N0X2NhdGVnb3J5Jywgcm93RGF0YSApLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGNvbnN0IHRlcm1zID0gJCggdGhpcyApLnRleHQoKTtcblxuXHRcdFx0XHRcdGlmICggdGVybXMgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB0YXhuYW1lID0gJCggdGhpcyApLmF0dHIoICdpZCcgKS5yZXBsYWNlKCAnXycgKyBpZCwgJycgKTtcblx0XHRcdFx0XHRcdC8vIFRhcmdldCByYWRpb3MgKGluc3RlYWQgb2YgY2hlY2tib3hlcykuXG5cdFx0XHRcdFx0XHQkKCAndWwuJyArIHRheG5hbWUgKyAnLWNoZWNrbGlzdCA6cmFkaW8nLCBlZGl0Um93IClcblx0XHRcdFx0XHRcdFx0LnZhbCggdGVybXMuc3BsaXQoICcsJyApICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9O1xuXHRcdH0gKTtcblxuXHRcdC8qKlxuXHRcdCAqIEhhbmRsZSB0aGUgYWx0ZXJuYXRpdmUgbGFiZWxzLCBieSBwcm92aWRpbmcgYW4gJ0FkZCBtb3JlIHRpdGxlcydcblx0XHQgKiBidXR0b24gYW5kIGlucHV0IHRleHRzIHdoZXJlIHRvIGFkZCB0aGUgbGFiZWxzLlxuXHRcdCAqXG5cdFx0ICogQHNpbmNlIDMuMi4wXG5cdFx0ICovXG5cdFx0JCggZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBBZGQgdGhlIGRlbGV0ZSBidXR0b24gdG8gdGhlIGV4aXN0aW5nIGlucHV0IHRleHRzLlxuXHRcdFx0JCggJy53bC1hbHRlcm5hdGl2ZS1sYWJlbCA+IC53bC1kZWxldGUtYnV0dG9uJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdCQoIGV2ZW50LmRlbGVnYXRlVGFyZ2V0ICkucGFyZW50KCkucmVtb3ZlKCk7XG5cdFx0XHR9ICk7XG5cblx0XHRcdC8vIEhhbmRsZSB0aGUgY2xpY2sgb24gdGhlICdBZGQgbW9yZSB0aXRsZXMnIGJ1dHRvbiBhbmQgYmluZCB0aGVcblx0XHRcdC8vIGV2ZW50IG9mIHRoZSAobmV3KSBkZWxldGUgYnV0dG9uLlxuXHRcdFx0JCggJyN3bC1hZGQtYWx0ZXJuYXRpdmUtbGFiZWxzLWJ1dHRvbicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0XHQkKCBldmVudC5kZWxlZ2F0ZVRhcmdldCApLmJlZm9yZSggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y29uc3QgJGVsZW1lbnQgPSAkKCAkKCAnI3dsLXRtcGwtYWx0ZXJuYXRpdmUtbGFiZWwtaW5wdXQnICkuaHRtbCgpICk7XG5cdFx0XHRcdFx0JGVsZW1lbnQuY2hpbGRyZW4oICcud2wtZGVsZXRlLWJ1dHRvbicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkZWxlbWVudC5yZW1vdmUoKTtcblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0cmV0dXJuICRlbGVtZW50O1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hlY2sgZm9yIGR1cGxpY2F0ZSB0aXRsZS9sYWJlbHMgdmlhIEFKQVggd2hpbGUgdGhlIHVzZXIgaXMgdHlwaW5nLlxuXHRcdCAqXG5cdFx0ICogQHNpbmNlIDMuMi4wXG5cdFx0ICovXG5cdFx0JCggZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyByZXR1cm4gaWYgd2UgYXJlIG5vdCBpbiB0aGUgZW50aXR5IGVkaXRvciBwYWdlICh0aGUgKndsU2V0dGluZ3MqXG5cdFx0XHQvLyBqc29uIGlzIG9ubHkgZW5xdWV1ZWQgdGhlcmUpIHdsU2V0dGluZ3MuZW50aXR5QmVpbmdFZGl0ZWQgY29tZXNcblx0XHRcdC8vIGZyb20gYHdwX2xvY2FsaXplX3NjcmlwdGAsIHNvICcxJyAodHJ1ZSkgb3IgJycgKGZhbHNlKS5cblx0XHRcdGlmICggdHlwZW9mIHdsU2V0dGluZ3MgPT09ICd1bmRlZmluZWQnIHx8ICcxJyAhPT0gd2xTZXR0aW5ncy5lbnRpdHlCZWluZ0VkaXRlZCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBQcmludCBlcnJvciBtZXNzYWdlIGluIHBhZ2UgYW5kIGhpZGUgaXQuXG5cdFx0XHRjb25zdCBkdXBsaWNhdGVkRW50aXR5RXJyb3JEaXYgPSAkKCAnPGRpdiBjbGFzcz1cIndsLW5vdGljZSBub3RpY2Ugd2wtc3VnZ2VzdGlvblwiJyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnIGlkPVwid2wtc2FtZS10aXRsZS1lcnJvclwiID48cD48L3A+PC9kaXY+JyApXG5cdFx0XHRcdC5pbnNlcnRCZWZvcmUoICdkaXYud3JhcCBbbmFtZT1wb3N0XScgKVxuXHRcdFx0XHQuaGlkZSgpO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIENoZWNrIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB0aXRsZSBpcyBhbHJlYWR5IHVzZWQgYnkgb3RoZXJcblx0XHRcdCAqIGVudGl0aWVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBzaW5jZSAzLjEwLjBcblx0XHRcdCAqL1xuXHRcdFx0Y29uc3QgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0Ly8gQSBqUXVlcnkgcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IGZpcmluZyB0aGUgZXZlbnQuXG5cdFx0XHRcdGNvbnN0ICR0aGlzID0gJCggdGhpcyApO1xuXG5cdFx0XHRcdC8vIERlbGF5IGV4ZWN1dGlvbiBvZiB0aGUgY2hlY2suXG5cdFx0XHRcdGRlbGF5KCAkdGhpcywgY2hlY2ssICQsIHdwLmFqYXgsICR0aGlzLnZhbCgpLCB3bFNldHRpbmdzLnBvc3RfaWQsXG5cdFx0XHRcdFx0ICAgd2xTZXR0aW5ncy5sMTBuWyAnWW91IGFscmVhZHkgcHVibGlzaGVkIGFuIGVudGl0eSB3aXRoIHRoZSBzYW1lIG5hbWUnIF0sXG5cdFx0XHRcdFx0ICAgZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0XHRcdFx0XHQgICAvLyBTZXQgdGhlIGVycm9yIGRpdiBjb250ZW50LlxuXHRcdFx0XHRcdFx0ICAgJCggJyN3bC1zYW1lLXRpdGxlLWVycm9yIHAnICkuaHRtbCggaHRtbCApO1xuXG5cdFx0XHRcdFx0XHQgICAvLyBJZiB0aGUgaHRtbCBjb2RlIGlzbid0IGVtcHR5IHRoZW4gc2hvdyB0aGUgZXJyb3IuXG5cdFx0XHRcdFx0XHQgICBpZiAoICcnICE9PSBodG1sICkge1xuXHRcdFx0XHRcdFx0XHQgICBkdXBsaWNhdGVkRW50aXR5RXJyb3JEaXYuc2hvdygpO1xuXHRcdFx0XHRcdFx0ICAgfSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0ICAgLy8gSWYgdGhlIGh0bWwgY29kZSBpcyBlbXB0eSwgaGlkZSB0aGUgZXJyb3IgZGl2LlxuXHRcdFx0XHRcdFx0XHQgICBkdXBsaWNhdGVkRW50aXR5RXJyb3JEaXYuaGlkZSgpO1xuXHRcdFx0XHRcdFx0ICAgfVxuXHRcdFx0XHRcdCAgIH0gKTtcblx0XHRcdH07XG5cblx0XHRcdC8vIFdoZW5ldmVyIHNvbWV0aGluZyBoYXBwZW5zIGluIHRoZSBlbnRpdHkgdGl0bGUuLi5cblx0XHRcdCQoICdbbmFtZT1wb3N0X3RpdGxlXScgKVxuXHRcdFx0XHQub24oICdjaGFuZ2UgcGFzdGUga2V5dXAnLCBjYWxsYmFjayApXG5cdFx0XHRcdC5lYWNoKCBjYWxsYmFjayApO1xuXHRcdH0gKTtcblxuXHRcdC8qKlxuXHRcdCAqIERyYXcgZGFzaGJvYXJkIGlmIG5lZWRlZFxuXHRcdCAqXG5cdFx0ICogQHNpbmNlIDMuNC4wXG5cdFx0ICovXG5cdFx0JCggZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyByZXR1cm4gaWYgbm90IG5lZWRlZFxuXHRcdFx0aWYgKCAhICQoICcjd2wtZGFzaGJvYXJkLXdpZGdldC1pbm5lci13cmFwcGVyJyApLmxlbmd0aCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQkLmdldEpTT04oIGFqYXh1cmwgKyAnP2FjdGlvbj13b3JkbGlmdF9nZXRfc3RhdHMnLCBmdW5jdGlvbiggc3RhdHMgKSB7XG5cdFx0XHRcdC8vIEdldCB0aGUgdHJpcGxlcywgMCBieSBkZWZhdWx0IGlmIHRyaXBsZXMgaXMgbm90IGEgbnVtYmVyLlxuXHRcdFx0XHRjb25zdCB0cmlwbGVzID0gaXNOYU4oIHN0YXRzLnRyaXBsZXMgKSA/IDAgOiBzdGF0cy50cmlwbGVzO1xuXG5cdFx0XHRcdC8vIENhbGN1bGF0ZSB3aWtpZGF0YSByYXRpb1xuXHRcdFx0XHQvLyBUT0RPIHBlcmNlbnRhZ2Ugc2hvdWxkIGJlIGFkZGVkIHZpYSBjc3Ncblx0XHRcdFx0Y29uc3QgcGVyY2VudCA9IHRyaXBsZXMgKiAxMDAgLyA5NDc2OTAxNDM7XG5cdFx0XHRcdHN0YXRzLndpa2lkYXRhID0gcGVyY2VudC50b0ZpeGVkKCA1ICkgKyAnJSc7XG5cdFx0XHRcdC8vIENhbGN1bGF0ZSBhbm5vdGF0ZWQgcG9zdHMgcmF0aW9cblx0XHRcdFx0Y29uc3QgYW5ub3RhdGVkID0gc3RhdHMuYW5ub3RhdGVkX3Bvc3RzICogMTAwIC8gc3RhdHMucG9zdHM7XG5cdFx0XHRcdHN0YXRzLmFubm90YXRlZFBvc3RzUGVyY2VudGFnZSA9IGFubm90YXRlZC50b0ZpeGVkKCAxICk7XG5cdFx0XHRcdC8vIENvbnZlcnQgTmFOIHRvIHplcm8gaWYgbmVlZGVkXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vaW5zaWRlb3V0MTAvd29yZGxpZnQtcGx1Z2luL2lzc3Vlcy8yNjlcblx0XHRcdFx0c3RhdHMuYW5ub3RhdGVkUG9zdHNQZXJjZW50YWdlID0gc3RhdHMuYW5ub3RhdGVkUG9zdHNQZXJjZW50YWdlIHx8IDA7XG5cdFx0XHRcdC8vIFRPRE8gcGVyY2VudGFnZSBzaG91bGQgYmUgYWRkZWQgdmlhIGNzc1xuXHRcdFx0XHRzdGF0cy5hbm5vdGF0ZWRQb3N0c1BlcmNlbnRhZ2UgPSBzdGF0cy5hbm5vdGF0ZWRQb3N0c1BlcmNlbnRhZ2UgKyAnJSc7XG5cblx0XHRcdFx0Ly8gUG9wdWxhdGUgYW5ub3RhdGVkIHBvc3RzIHBpZSBjaGFydFxuXHRcdFx0XHQkKCAnI3dsLXBvc3RzLXBpZS1jaGFydCBjaXJjbGUnICkuY3NzKFxuXHRcdFx0XHRcdCdzdHJva2UtZGFzaGFycmF5Jyxcblx0XHRcdFx0XHQoXG5cdFx0XHRcdFx0XHQoXG5cdFx0XHRcdFx0XHRcdHN0YXRzLmFubm90YXRlZF9wb3N0cyAqIDEwMFxuXHRcdFx0XHRcdFx0KSAvIHN0YXRzLnBvc3RzXG5cdFx0XHRcdFx0KSArICcgMTAwJ1xuXHRcdFx0XHQpO1xuXHRcdFx0XHQvLyBQb3B1bGF0ZSBhdmFyYWdlIGVudGl0eSByYXRpbmdzIGdhdWdlIGNoYXJ0XG5cdFx0XHRcdCQoICcjd2wtZW50aXRpZXMtZ2F1Z2UtY2hhcnQgLnN0YXQnICkuY3NzKFxuXHRcdFx0XHRcdCdzdHJva2UtZGFzaGFycmF5Jyxcblx0XHRcdFx0XHQoXG5cdFx0XHRcdFx0XHRzdGF0cy5yYXRpbmcgLyAyXG5cdFx0XHRcdFx0KSArICcgMTAwJ1xuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdC8vIFRPRE8gcGVyY2VudGFnZSBzaG91bGQgYmUgYWRkZWQgdmlhIGNzc1xuXHRcdFx0XHRzdGF0cy5yYXRpbmcgPSBzdGF0cy5yYXRpbmcgKyAnJSc7XG5cdFx0XHRcdC8vIHBvcHVsYXRlIHZhbHVlIHBsYWNlaG9sZGVyc1xuXHRcdFx0XHRmb3IgKCBjb25zdCBwcm9wZXJ0eSBpbiBzdGF0cyApIHtcblx0XHRcdFx0XHQkKCAnI3dsLWRhc2hib2FyZC13aWRnZXQtJyArIHByb3BlcnR5ICkudGV4dCggc3RhdHNbIHByb3BlcnR5IF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZpbmFsbHkgc2hvdyB0aGUgd2lkZ2V0XG5cdFx0XHRcdCQoICcjd2wtZGFzaGJvYXJkLXdpZGdldC1pbm5lci13cmFwcGVyJyApLnNob3coKTtcblxuXHRcdFx0XHQvLyBTZXQgdGhlIHNhbWUgaGVpZ2h0IGZvciBzdGF0IGdyYXBoIHdyYXBwZXJzXG5cdFx0XHRcdC8vIExpbmtzIG5vdCB3b3JraW5nIHdpdGggY3NzIGFsdGVybmF0aXZlc1xuXHRcdFx0XHRsZXQgbWluSGVpZ2h0ID0gMDtcblx0XHRcdFx0JCggJy53bC1zdGF0LWdyYXBoLXdyYXBwZXInICkuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y29uc3Qgc3RhdCA9ICQoIHRoaXMgKTtcblx0XHRcdFx0XHRpZiAoIHN0YXQuaGVpZ2h0KCkgPiBtaW5IZWlnaHQgKSB7XG5cdFx0XHRcdFx0XHRtaW5IZWlnaHQgPSBzdGF0LmhlaWdodCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXG5cdFx0XHRcdCQoICcud2wtc3RhdC1ncmFwaC13cmFwcGVyJyApLmNzcyggJ21pbi1oZWlnaHQnLCBtaW5IZWlnaHQgKTtcblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cdH1cbikoIGpRdWVyeSApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9hZG1pbi9qcy93b3JkbGlmdC1hZG1pbi5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQU1BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=")}});