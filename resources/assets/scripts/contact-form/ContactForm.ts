import Controllable from '../util/controllers/Controllable';
import FormField from '../form-field/FormField';

/** ContactForm component model. */
export default class ContactForm extends Controllable {

	/** Store of the form's main FormField component. */
	private _mainField: FormField | undefined;

	/** Main FormField component of the form. */
	public get mainField(): FormField {
		if (!this._mainField) {
			const rawField: HTMLElement = this.element.querySelector(
				'.contact-form__main-wrapper .form-field',
			);

			this._mainField = new FormField(rawField);
		}

		return this._mainField;
	}

	/** Root elements of the form's FormField components, excluding the root of the form's main FormField. */
	public get nonMainFieldRoots(): HTMLElement[] {

		const fields = Array.from(this.element.querySelectorAll<HTMLElement>('.form-field'));

		return fields.filter((el: HTMLElement) => !el.isSameNode(
			this.mainField.element
		));
	}

	/** Submission button of the form. */
	public get submitButton(): HTMLElement {
		return this.element.querySelector('.button--submit');
	}

	/** Template containing additional FormFields. */
	public get template(): HTMLTemplateElement {
		return document.querySelector(`#${this.templateId}`);
	}

	/** HTML id of the form's template. */
	public get templateId(): string {
		return `${this.element.id}__remainder`;
	}

	/**
	 * @param element Root element of the ContactForm component.
	 */
	constructor(public readonly element: HTMLFormElement) {
		super(element.id);
	}

}
