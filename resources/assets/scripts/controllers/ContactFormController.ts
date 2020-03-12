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

		this.lockVerticalMargins();
		this.expandForm();
		this.createFieldControllers();
		this.enableSubmitButton();
		this.markActive();

		// execute post-activation hooks
		this.doPostActivate();
	}

	/** indicates the form is active by applying the appropriate css class */
	private markActive(): void {
		this.contactForm.addClass(ContactFormController.activeStateClass);
	}

	/** enables the forms submission button */
	private enableSubmitButton(): void {
		this.submitButton.removeAttr('disabled');
	}

	/** the submission button of the form */
	private get submitButton(): JQuery<HTMLElement> {
		return this.contactForm.find('.button--submit');
	}

	/** expand the form to it's 'active' state using template content */
	private expandForm(): void {
		this.contactForm.append(this.template.html());
	}

	/** the template containing the expanded/'active' form's fields */
	private get template(): JQuery<HTMLElement> {
		return $(`#${this.templateId}`);
	}

	/** the html id of the form's template */
	private get templateId(): string {
		return `${this.id}__remainder`;
	}

	/** the html id of the form */
	private get id(): string {
		return this.contactForm.attr('id');
	}

	/** lock the top/bottom margins to their current value */
	private lockVerticalMargins(): void {
		this.contactForm.css('margin', `${this.marginTop} 0`);
	}

	/** current top margin size */
	private get marginTop(): string {
		return this.contactForm.css('margin-top');
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

		this.shrinkForm();
		this.unlockVerticalMargins();
		this.disableSubmitButton();
		this.markInactive();

		// execute post-deactivation hooks
		this.doPostDeactivate();
	}

	/** indicates the form is inactive by removing the appropriate css class */
	private markInactive(): void {
		this.contactForm.removeClass(ContactFormController.activeStateClass);
	}

	/** disable the form's submit button */
	private disableSubmitButton(): void {
		this.submitButton.attr('disabled', '');
	}

	/** enable responsive top/bottom margin resizing */
	private unlockVerticalMargins(): void {
		this.contactForm.css('margin', `auto 0`);
	}

	/** shrink the form by removing it's 'expanded'/'active' state fields */
	private shrinkForm(): void {
		this.fieldsUniqueToActive.remove();
	}

	/** fields that are only present when the form is active */
	private get fieldsUniqueToActive(): JQuery<HTMLElement> | undefined {
		if (this.isActive) {
			return this.contactForm.children('.contact-form__field');
		}

		return undefined;
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
