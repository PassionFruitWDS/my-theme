import 'jquery';

/** implements form field behavior */
export default class FormFieldController {

	/** css class indicating the form field is in the 'active' state */
	private static activeStateClass = 'form-field--active-state';

	/** cache for the form field's input element */
	private _input: JQuery<HTMLElement> | undefined;

	constructor(private readonly jqFormField: JQuery<HTMLElement>) {}

	/** the form field's input element */
	private get input(): JQuery<HTMLElement> {
		if (!this._input) {
			this._input = this.jqFormField.find('.form-field__input');
		}

		return this._input;
	}

	/** resolves the presence of user input in the field */
	public hasInput(): boolean {
		return !!this.input.val();
	}

	/** resolves the field's 'active'/'inactive' state */
	public isActive(): boolean {
		return this.jqFormField.hasClass(FormFieldController.activeStateClass);
	}

	/** soft-failing activator for the form field */
	private tryAndActivate(): boolean {
		let status = false;

		if (!this.isActive() && this.hasInput()) {
			this.doActivate();
			status = true;
		}

		return status;
	}

	/** execute active state entrance behavior */
	private doActivate(): void {
		this.jqFormField.addClass(FormFieldController.activeStateClass);
	}

	/** soft-failing deactivator for the form field */
	private tryAndDeactivate(): boolean {
		let status = false;

		if (this.isActive() && !this.hasInput()) {
			this.doDeactivate();
			status = true;
		}

		return status;
	}

	/** execute inactive state entrance behavior */
	private doDeactivate(): void {
		this.jqFormField.removeClass(FormFieldController.activeStateClass);
	}

	/** determines and, if appropriate, changes the form field's current state */
	private resolveState(): void {
		if (!this.tryAndActivate()) {
			this.tryAndDeactivate();
		}
	}

	/** apply intended behavior to the form field */
	public initialize(): void {
		this.input.on('input', this.resolveState.bind(this));
	}

}
