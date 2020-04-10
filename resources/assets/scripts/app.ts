/**
 * External Dependencies
 */
import FormFieldController, { FormFieldControllerConfig } from './form-field/FormFieldController';
import ContactFormController, { ContactFormControllerConfig } from './contact-form/ContactFormController';
import HeroController from './hero/HeroController';
import { CarouselData, Carousel } from './carousel/Carousel';
import TermsController from './footer/TermsController';

declare const pageData: {
	formFieldCtrConfig: FormFieldControllerConfig;
	contactFormCtrConfig: ContactFormControllerConfig;
	carouselData: CarouselData[];
};

class App {

	private static cachedInstance: App;

	public static get instance(): App {
		if (!this.cachedInstance) {
			throw Error('Singleton must be initialized before accessing');
		}
		return App.cachedInstance;
	}

	private constructor() {}

	public static initialize(
		{
			formFieldCtrConfig,
			contactFormCtrConfig,
			carouselData,
		}: typeof pageData,
	): void {
		FormFieldController.initialize(formFieldCtrConfig);
		ContactFormController.initialize(contactFormCtrConfig);
		const heroCtr = new HeroController(document.querySelector('.hero'));
		heroCtr.initialize();

		const carousel = new Carousel(document.querySelector('#featured__carousel'), carouselData);
		carousel.initialize();

		const termsController = new TermsController();
		termsController.initialize();
	}

}

document.addEventListener('DOMContentLoaded', () => { App.initialize(pageData); });
