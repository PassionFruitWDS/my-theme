/**
 * External Dependencies
 */
import 'jquery';
import { NavController } from './controllers/NavController';
import { FormFieldController } from './controllers/FormFieldController';
import { ContactFormController } from './controllers/ContactFormController';
import { HeroController } from './controllers/HeroController';

$(document).ready(() => {
	new NavController($('.nav'), $('.hamburger')).initialize();

	$('.form-field')
		.toArray()
		.forEach(element => {
			new FormFieldController($(element)).initialize();
		});

	const contactFormCtr = new ContactFormController($('.contact-form'));
	const heroCtr = new HeroController($('.hero'));
	heroCtr.initialize(contactFormCtr);
	contactFormCtr.initialize();
});
