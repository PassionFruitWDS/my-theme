import 'jquery';
import Controllable from '../util/controllers/Controllable';
import FormField from '../form-field/FormField';

/** Contact form interface/data container. */
export default class ContactForm extends Controllable {

	/**
	 * PROPERTIES
	 */

	/** Cache of the form's raw main form field. */
	private _rawMainField: JQuery<HTMLElement> | undefined;

	/** Main form field of the form as a raw JQuery object. */
	public get rawMainField(): JQuery<HTMLElement> {
		if (!this._rawMainField) {
			this._rawMainField = this.rawContactForm.find(
				'.contact-form__main-wrapper .form-field',
			);
		}

		return this._rawMainField;
	}

	/** Store of the object attached to the form's main form field */
	private _mainField: FormField | undefined;

	/** FormField object attached to the form's main form field */
	public get mainField(): FormField {
		if (!this._mainField) {
			this._mainField = new FormField(this.rawMainField);
		}

		return this._mainField;
	}

	/** Form fields of the form as raw JQuery objects. */
	public get rawFields(): JQuery<HTMLElement> {
		return this.rawContactForm.find('.form-field');
	}

	/** Form fields of the form, other than its main field, as raw JQuery objects. */
	public get rawNotMainFields(): JQuery<HTMLElement> {
		return this.rawFields.filter(':not(.contact-form__main-wrapper .form-field)');
	}

	/** Input elements of the form. */
	public get inputs(): HTMLElement[] {
		const inputs = this.rawContactForm.find('input:not(.button)').toArray();

		return inputs;
	}

	/** Submission button of the form. */
	public get submitButton(): JQuery<HTMLElement> {
		return this.rawContactForm.find('.button--submit');
	}

	/** Template containing additional form fields. */
	public get template(): JQuery<HTMLElement> {
		return $(`#${this.templateHtmlId}`);
	}

	/** HTML id of the form's template. */
	public get templateHtmlId(): string {
		return `${this.htmlId}__remainder`;
	}

	/** HTML id of the form. */
	public get htmlId(): string {
		const id = this.rawContactForm.attr('id');

		if (!id) {
			throw Error('Contact form element lacks id.');
		}

		return id;
	}

	/** Top margin size of the form. */
	public get marginTop(): string {
		return this.rawContactForm.css('margin-top');
	}

	/**
	 * PUBLIC METHODS
	 */

	/**
	 * @param rawContactForm Raw form element associated with the ContactForm.
	 */
	constructor(public readonly rawContactForm: JQuery<HTMLElement>) {
		super(rawContactForm.attr('id'));
	}

}
