import 'jquery';
import FormFieldController from './FormFieldController';
import Callbacks from '../util/Callbacks';
import { ContactForm, ContactFormState } from './ContactForm';
import ControllerBase from './ControllerBase';

type T = () => void;

/** Implements contact form behavior. */
export default class ContactFormController extends ControllerBase<ContactForm> {

	/** Callbacks registered to the post-activation hook. */
	protected postActivateCallbacks: Callbacks<T> = new Callbacks<T>();

	/** Callbacks registered to the pre-activation hook. */
	protected preActivateCallbacks: Callbacks<T> = new Callbacks<T>();

	/** Callbacks registered to the post-deactivation hook. */
	protected postDeactivateCallbacks: Callbacks<T> = new Callbacks<T>();

	/** Callbacks registered to the pre-deactivation hook. */
	protected preDeactivateCallbacks: Callbacks<T> = new Callbacks<T>();

	/** Cache of the cross-linked form field controller. */
	private _formFieldCtr: FormFieldController | undefined;

	/** Cross-linked form field controller. */
	protected get formFieldCtr(): FormFieldController {
		if (!this._formFieldCtr) {
			throw Error('Cannot access formFieldCtr before initialization.');
		}

		return this._formFieldCtr;
	}

	/** Soft-failing activator for the form. */
	protected tryAndActivate(): void {
		if (!this.current.isActive) {
			this.doActivate();
		}
	}

	/** Execute 'active' state entrance behavior. */
	protected doActivate(): void {
		// Execute pre-activation hooks.
		this.doPreActivate();

		this.markActive();
		this.lockVerticalMargins();
		this.expandForm();
		this.createFieldControllers();
		this.enableSubmitButton();

		// Execute post-activation hooks.
		this.doPostActivate();
	}

	/** Indicate the form is active by applying the appropriate css class. */
	protected markActive(): void {
		this.current.contactForm.addClass(ContactForm.activeStateClass);
		this.current.state = ContactFormState.ACTIVE;
	}

	/** Enable the form's submission button. */
	protected enableSubmitButton(): void {
		this.current.submitButton.removeAttr('disabled');
	}

	/** Expand the form to it's 'active' state using template content. */
	protected expandForm(): void {
		this.current.contactForm.append(this.current.template.html());
	}

	/** Lock the top/bottom margins to their current value. */
	protected lockVerticalMargins(): void {
		this.current.contactForm.css('margin', `${this.current.marginTop} 0`);
	}

	/** Create controllers for newly appended form fields. */
	protected createFieldControllers(): void {
		function initialize(field: HTMLElement): void {
			new FormFieldController($(field)).initialize();
		}

		this.current.fieldsUniqueToActive.toArray().forEach(initialize);
	}

	/** Execute post-activation callbacks. */
	protected doPostActivate(): void {
		this.postActivateCallbacks.execute();
	}

	/** Execute pre-activation callbacks. */
	protected doPreActivate(): void {
		this.preActivateCallbacks.execute();
	}

	/**
	 * Hook a new callback to be run after activation.
	 *
	 * @param callback Callback function to be hooked.
	 */
	public registerPostActivate(callback: T): void {
		this.postActivateCallbacks.push(callback);
	}

	/**
	 * Hook a new callback to be run before activation.
	 *
	 * @param callback Callback function to be hooked.
	 */
	public registerPreActivate(callback: T): void {
		this.preActivateCallbacks.push(callback);
	}

	/** Soft-failing deactivator for the form. */
	protected tryAndDeactivate(): void {
		if (this.current.isActive && !this.current.hasAnyInput) {
			this.doDeactivate();
		}
	}

	/** Execute 'inactive' state entrance behavior. */
	protected doDeactivate(): void {
		// Execute pre-deactivation hooks.
		this.doPreDeactivate();

		this.shrinkForm();
		this.unlockVerticalMargins();
		this.disableSubmitButton();
		this.markInactive();

		// Execute post-deactivation hooks.
		this.doPostDeactivate();
	}

	/** Indicate the form is inactive by removing the appropriate css class. */
	protected markInactive(): void {
		this.current.contactForm.removeClass(ContactForm.activeStateClass);
		this.current.state = ContactFormState.INACTIVE;
	}

	/** Disable the form's submit button. */
	protected disableSubmitButton(): void {
		this.current.submitButton.attr('disabled', '');
	}

	/** Enable responsive top/bottom margin resizing. */
	protected unlockVerticalMargins(): void {
		this.current.contactForm.css('margin', 'auto 0');
	}

	/** Shrink the form by removing it's 'expanded'/'active' state fields. */
	protected shrinkForm(): void {
		this.current.fieldsUniqueToActive.remove();
	}

	/** Execute post-deactivation callbacks. */
	protected doPostDeactivate(): void {
		this.postDeactivateCallbacks.execute();
	}

	/** Execute pre-deactivation callbacks. */
	protected doPreDeactivate(): void {
		this.preDeactivateCallbacks.execute();
	}

	/**
	 * Hook a new callback to be run after deactivation.
	 *
	 * @param callback Callback function to attach to the hook.
	 */
	public registerPostDeactivate(callback: T): void {
		this.postDeactivateCallbacks.push(callback);
	}

	/**
	 * Hook a new callback to be run before deactivation.
	 *
	 * @param callback Callback function to attach to the hook.
	 */
	public registerPreDeactivate(callback: T): void {
		this.preDeactivateCallbacks.push(callback);
	}

	/**
	 * Initialize the controller by cross-linking dependencies.
	 *
	 * @param formFieldController Controller of the app's FormField elements.
	 */
	protected onInitialize(formFieldController: FormFieldController): void {
		this._formFieldCtr = formFieldController;
	}

	/** Implement contact form behavior. */
	protected onRegister(): void {
		const handleInput = this.current.notify(this.resolveState.bind(this));
		this.current.mainInput.on('input', handleInput);
	}

	/**
	 * Determines and, if appropriate, changes the key referenced form's current state.
	 *
	 * @param key Unique symbol identifying the form whose state is to be resolved.
	 */
	protected resolveState(key: symbol): void {
		this.loadByKey(key);

		if (this.current.isActive) {
			this.tryAndDeactivate();
		} else {
			this.tryAndActivate();
		}
	}

}
