/**
 * External Dependencies
 */
import 'jquery';
import FormFieldController from './form-field/FormFieldController';
import ContactFormController from './contact-form/ContactFormController';
import HeroController from './hero/HeroController';
import { CarouselData, Carousel } from './carousel/Carousel';
import TermsController from './terms/TermsController';

declare const pageData: { themeUrl: string };
const { themeUrl } = pageData;

$(document).ready(() => {
	// Hero
	FormFieldController.initialize({ activeStateClass: 'form-field--active-state' });
	ContactFormController.initialize({ activeStateClass: 'contact-form--is-active' });
	const heroCtr = new HeroController($('.hero'));
	heroCtr.initialize();

	// Tri-content
	const carouselData: CarouselData[] = [
		{
			title: 'Development',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			imgSources: {
				'icon-one': {
					src: `${themeUrl}/dist/images/curly-brackets.svg`,
					alt: 'Curly brackets',
				},
				'icon-two': {
					src: `${themeUrl}/dist/images/gear.svg`,
					alt: 'Gear',
				},
				'icon-three': {
					src: `${themeUrl}/dist/images/bug-fix.svg`,
					alt: 'Bug with wrench partially obscuring it',
				},
			},
		},
		{
			title: 'Marketing',
			content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			imgSources: {
				'icon-one': {
					src: `${themeUrl}/dist/images/at.svg`,
					alt: 'At symbol',
				},
				'icon-two': {
					src: `${themeUrl}/dist/images/magnifying-glass.svg`,
					alt: 'Magnifying glass',
				},
				'icon-three': {
					src: `${themeUrl}/dist/images/share.svg`,
					alt: 'Web sharing symbol',
				},
			},

		},
		{
			title: 'Design',
			content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			imgSources: {
				'icon-one': {
					src: `${themeUrl}/dist/images/pencil.svg`,
					alt: 'Pencil',
				},
				'icon-two': {
					src: `${themeUrl}/dist/images/responsive-smartphone.svg`,
					alt: 'Smartphone displaying a responsive web layout',
				},
				'icon-three': {
					src: `${themeUrl}/dist/images/palette.svg`,
					alt: 'Artist\'s palette',
				},
			},
		},
	];
	// eslint-disable-next-line no-new
	const carousel = new Carousel($('#featured__carousel'), carouselData);
	carousel.initialize();

	const termsController = new TermsController();
	termsController.initialize();
});
