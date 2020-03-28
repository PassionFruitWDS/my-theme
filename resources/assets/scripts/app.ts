/**
 * External Dependencies
 */
import 'jquery';
import FormFieldController from './form-field/FormFieldController';
import ContactFormController from './contact-form/ContactFormController';
import HeroController from './hero/HeroController';
import { CarouselData, Carousel } from './carousel/Carousel';

declare const injectedData: { themeUrl: string };
const { themeUrl } = injectedData;

$(document).ready(() => {
	// Hero
	FormFieldController.instance.initialize();
	ContactFormController.instance.initialize();
	const heroCtr = new HeroController($('.hero'));
	heroCtr.initialize();

	// Tri-content
	const carouselData: CarouselData[] = [
		{
			title: 'Development',
			content: 'Lorem',
			imgSources: {
				one: `${themeUrl}/dist/images/at.svg`,
				two: `${themeUrl}/dist/images/search.svg`,
				three: `${themeUrl}/dist/images/share.svg`,
			},
		},
		{
			title: 'Marketing',
			content: 'Ipsum',
			imgSources: {
				one: `${themeUrl}/dist/images/at.svg`,
				two: `${themeUrl}/dist/images/search.svg`,
				three: `${themeUrl}/dist/images/share.svg`,
			},

		},
		{
			title: 'Design',
			content: 'Dolor',
			imgSources: {
				one: `${themeUrl}/dist/images/at.svg`,
				two: `${themeUrl}/dist/images/search.svg`,
				three: `${themeUrl}/dist/images/share.svg`,
			},
		},
	];
	// eslint-disable-next-line no-new
	new Carousel($('.carousel'), carouselData);
});
