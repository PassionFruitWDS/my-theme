/**
 * External Dependencies
 */
import 'jquery';
import NavController from './controllers/NavController';
import FormFieldController from './controllers/FormFieldController';
import ContactFormController from './controllers/ContactFormController';
import HeroController from './controllers/HeroController';
import { ContactForm } from './controllers/ContactForm';

$(document).ready(() => {
	new NavController($('.nav'), $('.hamburger')).initialize();

	$('.form-field')
		.toArray()
		.forEach((element) => {
			new FormFieldController($(element)).initialize();
		});

	const contactFormCtr = new ContactFormController();
	const heroCtr = new HeroController($('.hero'));
	contactFormCtr.initialize(heroCtr);
	contactFormCtr.register(new ContactForm($('.contact-form')));
	heroCtr.initialize(contactFormCtr);
});
