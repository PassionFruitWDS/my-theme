import Controllable from '../util/controllers/Controllable';

export default class FormField extends Controllable {

	/** Cache for the form field's input element. */
	private _input: JQuery<HTMLElement> | undefined;

	/** Form field's input element. */
	public get input(): JQuery<HTMLElement> {
		if (!this._input) {
			this._input = this.formField.find('.form-field__input');
		}

		return this._input;
	}

	/** Flag indicating the presence of user input in the field. */
	public get hasInput(): boolean {
		return !!this.input.val();
	}

	constructor(public readonly formField: JQuery<HTMLElement>) {
		super();
	}

}
