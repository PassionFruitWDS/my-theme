import Controllable from '../util/controllers/Controllable';

export default class FormField extends Controllable {

	/** Cache for the FormField's input element. */
	private _input: HTMLInputElement | HTMLTextAreaElement | undefined;

	/** Input element of the FormField. */
	public get input(): HTMLInputElement | HTMLTextAreaElement {
		if (!this._input) {
			this._input = this.element.querySelector('input.form-field__input, textarea.form-field__input');
		}

		return this._input;
	}

	/** Flag indicating the presence of user input in the field. */
	public get hasInput(): boolean {
		return !!this.input.value;
	}

	/**
	 * @param element Root element of the FormField component.
	 */
	constructor(public readonly element: HTMLElement) {
		super();
	}

}
