import 'jquery';
import ContactFormController from '../contact-form/ContactFormController';
import ContactForm from '../contact-form/ContactForm';

/** implements hero section behavior */
export default class HeroController {

	constructor(
		/** a hero section */
		private hero: JQuery<HTMLElement>,
	) {}

	/**
	 * apply intended behavior
	 *
	 * @param contactFormCtr controller of the contact form contained within
	 * the hero section
	 */
	public initialize(): void {
		ContactFormController.instance.register(new ContactForm(this.hero.find('.contact-form')));
		const statefulContactForm = ContactFormController.instance.current;
		statefulContactForm
			.statesData
			.idle
			.exitHook
			.set(this.lockGrid.bind(this));
		statefulContactForm
			.statesData
			.idle
			.enterHook
			.set(this.unlockGrid.bind(this));
	}

	/** allows the hero to responsively resize by removing the pseudo-element shim */
	private unlockGrid(): void {
		this.hero.children('#hero__shim').remove();
	}

	/** prevents the hero from responsively resizing by introducing a pseudo-element shim */
	private lockGrid(): void {
		this.hero.append(this.shimHtml);
	}

	/** html style node of an appropriately sized shim pseudo-element */
	private get shimHtml(): string {
		return `<style type="text/css" id="hero__shim">
			.hero::before {
				grid-area: shim;
				content: "";
				min-height: ${this.shimRowHeight};
			}
		</style>`;
	}

	/** height of the hero grid's shim row */
	private get shimRowHeight(): string {
		const rowHeights = this.hero.css('grid-template-rows').split(' ');
		const shimRowIndex = 2;
		const shimHeight = rowHeights[shimRowIndex];
		return shimHeight;
	}

}
