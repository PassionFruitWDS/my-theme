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

	// toggle expansion of contact form
	const mainField = $('.contact-form__main-wrapper input');
	mainField.on('input', event => {
		const targetElement = $(event.target);
		const formId = targetElement.attr('form');
		const form = $(`#${formId}`);
		const cssClass = 'contact-form--is-active';
		if (!form.hasClass(cssClass)) {
			const hero = form.parent('.hero');
			const gridHeights = hero.css('grid-template-rows').split(' ');
			const shimHeight = gridHeights[2];
			hero.append(`<style type="text/css">.hero::before {grid-area: shim; content: ""; min-height: ${shimHeight};</style>`);
			form.css('margin', `${form.css('margin-top')} 0`);
			const template = $(`#${formId}__remainder`);
			form.append(template.html());
			form.find('.button--submit').removeAttr('disabled');
			form.addClass(cssClass);
		} else {
			if (form.find('input:not(.button)').toArray().every(element => !$(element).val())) {
				form.children('.contact-form__field').remove();
				form.removeClass(cssClass);
				form.css('margin', `auto 0`);
				form.find('.button--submit').attr('disabled', true);
				form.parent('.hero').children('style').remove();
			}
		}
	});
});
