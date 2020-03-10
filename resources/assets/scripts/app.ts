/**
 * External Dependencies
 */
import 'jquery';
import { NavController } from './controllers/NavController';
import { FormFieldController } from './controllers/FormFieldController';
import { ContactFormController } from './controllers/ContactFormController';

$(document).ready(() => {
	new NavController($('.nav'), $('.hamburger')).initialize();

	$('.form-field')
		.toArray()
		.forEach(element => {
			new FormFieldController($(element)).initialize();
		});

	new ContactFormController($('.contact-form')).initialize();
});
