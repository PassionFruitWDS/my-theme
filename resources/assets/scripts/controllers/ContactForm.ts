import 'jquery';
import Controllable from './Controllable';

/** Defined states of a contact form. */
export enum ContactFormState {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

/** Contact form interface/data container. */
export class ContactForm extends Controllable {

	/**
	 * PROPERTIES
	 */

	/** CSS class indicating the form is ACTIVE. */
	public static activeStateClass = 'contact-form--is-active';

	/** Cache of the form's main input field. */
	private _mainInput: JQuery<HTMLElement> | undefined;

	/** Main input field of the form. */
	public get mainInput(): JQuery<HTMLElement> {
		if (!this._mainInput) {
			this._mainInput = this.contactForm.find(
				'.contact-form__main-wrapper input',
			);
		}

		return this._mainInput;
	}

	/** State of the form. */
	public state: ContactFormState = ContactFormState.INACTIVE;

	/** Input elements of the form. */
	public get inputs(): HTMLElement[] {
		const inputs = this.contactForm.find('input:not(.button)').toArray();

		return inputs;
	}

	/** Submission button of the form. */
	public get submitButton(): JQuery<HTMLElement> {
		return this.contactForm.find('.button--submit');
	}

	/** Template containing the ACTIVE form's fields. */
	public get template(): JQuery<HTMLElement> {
		return $(`#${this.templateId}`);
	}

	/** HTML id of the form's template. */
	public get templateId(): string {
		return `${this.id}__remainder`;
	}

	/** HTML id of the form. */
	public get id(): string {
		const id = this.contactForm.attr('id');

		if (!id) {
			throw Error('Contact form element lacks id.');
		}

		return id;
	}

	/** Top margin size of the form. */
	public get marginTop(): string {
		return this.contactForm.css('margin-top');
	}

	/** Fields of the form that are only present an ACTIVE form. */
	public get fieldsUniqueToActive(): JQuery<HTMLElement> {
		if (!this.isActive) {
			throw Error('Form is not in the active state');
		}

		return this.contactForm.children('.contact-form__field');
	}

	/** Flag indicating the form is ACTIVE. */
	public get isActive(): boolean {
		return ContactFormState.ACTIVE === this.state;
	}

	/** Flag indicating one or more of the form's fields currently have user input. */
	public get hasAnyInput(): boolean {
		function hasInput(input: HTMLElement): boolean {
			const status = !!$(input).val();

			return status;
		}

		const status = this.inputs.some(hasInput);

		return status;
	}

	/**
	 * PUBLIC METHODS
	 */

	/**
	 * @param contactForm Raw form element associated with the ContactForm.
	 */
	constructor(public readonly contactForm: JQuery<HTMLElement>) {
		super();
	}

}
