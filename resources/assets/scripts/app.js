/**
 * External Dependencies
 */
import 'jquery';
import 'bootstrap';

$(document).ready(() => {
	const hamburger = $('.hamburger');
	const nav = $('.nav');
	$('.hamburger').on('click', (event) => {
		hamburger.toggleClass('is-active');
		nav.toggleClass('is-active');
	});

	const inputs = $(".form-field__input");
	inputs.on('input', event => {
		const targetElement = $(event.target);
		const blockElement = targetElement.parent();
		const cssClass = 'form-field--active-state';
		if (!targetElement.val()) {
			blockElement.removeClass(cssClass);
		} else if (!blockElement.hasClass(cssClass)) {
			blockElement.addClass(cssClass);
		}
	});
});
