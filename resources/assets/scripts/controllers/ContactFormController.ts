import 'jquery';
import { FormFieldController } from './FormFieldController';
import { Callbacks } from '../util/Callbacks';

/** implements contact form behavior */
export class ContactFormController {
	/** css class indicating the form is in the 'active' state */
	private static activeStateClass: string = 'contact-form--is-active';
	/** cache for the form's main input field */
	private _mainInput: JQuery<HTMLElement> | undefined;
	/** callbacks registered to the post-activation hook */
	private postActivateCallbacks: Callbacks = new Callbacks();
	/** callbacks registered to the pre-activation hook */
	private preActivateCallbacks: Callbacks = new Callbacks();
	/** callbacks registered to the post-deactivation hook */
	private postDeactivateCallbacks: Callbacks = new Callbacks();
	/** callbacks registered to the pre-deactivation hook */
	private preDeactivateCallbacks: Callbacks = new Callbacks();

	constructor(private readonly contactForm: JQuery<HTMLElement>) {}

	/** the form's main input field */
	private get mainInput(): JQuery<HTMLElement> {
		if (!this._mainInput) {
			this._mainInput = this.contactForm.find(
				'.contact-form__main-wrapper input',
			);
		}

		return this._mainInput;
	}

	/** the form's input elements */
	private get inputs(): HTMLElement[] {
		const inputs = this.contactForm.find('input:not(.button)').toArray();

		return inputs;
	}

	/** resolves the form's 'active'/'inactive' state */
	private isActive(): boolean {
		const status = this.contactForm.hasClass(
			ContactFormController.activeStateClass,
		);

		return status;
	}

	/** resolves the presence of user input in the form's fields */
	private hasAnyInput(): boolean {
		function hasInput(input: HTMLElement): boolean {
			const status = !!$(input).val();

			return status;
		}

		const status = this.inputs.some(hasInput);

		return status;
	}

	/** soft-failing activator for the form */
	private tryAndActivate(): boolean {
		let status = false;

		if (!this.isActive()) {
			this.doActivate();
			status = true;
		}

		return status;
	}

	/** execute 'active' state entrance behavior */
	private doActivate(): void {
		// execute pre-activation hooks
		this.doPreActivate();

		this.contactForm.css('margin', `${this.contactForm.css('margin-top')} 0`);
		const template = $(`#${this.contactForm.attr('id')}__remainder`);
		this.contactForm.append(template.html());
		this.createFieldControllers();
		this.contactForm.find('.button--submit').removeAttr('disabled');
		this.contactForm.addClass(ContactFormController.activeStateClass);

		// execute post-activation hooks
		this.doPostActivate();
	}

	/** create controllers for newly appended form fields */
	private createFieldControllers(): void {
		this.contactForm
			.children('.contact-form__field')
			.toArray()
			.forEach(field => {
				let controller = new FormFieldController($(field));
				controller.initialize();
			});
	}

	/** execute post-activation callbacks */
	private doPostActivate(): void {
		this.postActivateCallbacks.execute();
	}

	/** execute pre-activation callbacks */
	private doPreActivate(): void {
		this.preActivateCallbacks.execute();
	}

	/** hook a new callback to be run after activation */
	public registerPostActivate(callback: () => void): void {
		this.postActivateCallbacks.push(callback);
	}

	/** hook a new callback to be run before activation */
	public registerPreActivate(callback: () => void): void {
		this.preActivateCallbacks.push(callback);
	}

	/** soft-failing deactivator for the form */
	private tryAndDeactivate(): boolean {
		let status = false;
		if (this.isActive() && !this.hasAnyInput()) {
			this.doDeactivate();

			status = true;
		}

		return status;
	}

	/** execute 'inactive' state entrance behavior */
	private doDeactivate(): void {
		// execute pre-deactivation hooks
		this.doPreDeactivate();

		this.contactForm.children('.contact-form__field').remove();
		this.contactForm.removeClass(ContactFormController.activeStateClass);
		this.contactForm.css('margin', `auto 0`);
		this.contactForm.find('.button--submit').attr('disabled', '');

		// execute post-deactivation hooks
		this.doPostDeactivate();
	}

	/** execute post-deactivation callbacks */
	private doPostDeactivate(): void {
		this.postDeactivateCallbacks.execute();
	}

	/** execute pre-deactivation callbacks */
	private doPreDeactivate(): void {
		this.preDeactivateCallbacks.execute();
	}

	/** hook a new callback to be run after deactivation */
	public registerPostDeactivate(callback: () => void): void {
		this.postDeactivateCallbacks.push(callback);
	}

	/** hook a new callback to be run before deactivation */
	public registerPreDeactivate(callback: () => void): void {
		this.preDeactivateCallbacks.push(callback);
	}

	/** apply intended behavior to the element */
	public initialize(): void {
		this.mainInput.on('input', this.resolveState.bind(this));
	}

	/** determines and, if appropriate, changes the form's current state */
	private resolveState(): void {
		if (!this.tryAndActivate()) {
			this.tryAndDeactivate();
		}
	}
}
