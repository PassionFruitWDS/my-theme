/**
 * External Dependencies
 */
import 'jquery';
import NavController from './nav/NavController';
import FormFieldController from './form-field/FormFieldController';
import ContactFormController from './contact-form/ContactFormController';
import HeroController from './hero/HeroController';

$(document).ready(() => {
	new NavController($('.nav'), $('.hamburger')).initialize();

	FormFieldController.instance.initialize();
	ContactFormController.instance.initialize();
	const heroCtr = new HeroController($('.hero'));
	heroCtr.initialize();
});
