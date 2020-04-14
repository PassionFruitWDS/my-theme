import ControllerBase from '../util/controllers/ControllerBase';
import ContactForm from './ContactForm';
import ContactFormStateMachine from './ContactFormStateMachine';
import { StatefulContactForm } from './ContactFormTypeDecs';
import FormFieldController from '../form-field/FormFieldController';
import { StatefulFormField } from '../form-field/FormFieldTypeDecs';

/** Configuration needed to initialize a ContactFormController. */
export type ContactFormControllerConfig = {
	activeStateClass: string;
	inFocusFieldClass: string;
};

/**
 * Oversees registration and behavior implementation for ContactForm components.
 * Follows singleton pattern and must be created prior to use.
 */
export default class ContactFormController extends ControllerBase<
	ContactForm,
	StatefulContactForm
> {

	// --- STATIC ---

	/** Cache of the instance of the singleton. */
	private static cachedInstance: ContactFormController | undefined;

	/** Instance of the singleton. */
	public static get instance(): ContactFormController {
		if (!ContactFormController.cachedInstance) {
			throw Error('Attempted to access controller instance before initialization');
		}

		return ContactFormController.cachedInstance;
	}

	/**
	 * Construct the instance of the controller.
	 *
	 * @param config Configuration data for the controller.
	 */
	public static constructInstance(config: ContactFormControllerConfig): void {
		if (!ContactFormController.cachedInstance) {
			ContactFormController.cachedInstance = new ContactFormController(
				config
			);
		} else {
			throw Error('Attempted to construct more than one instance of the singleton.');
		}
	}

	// --- INSTANCE ---

	/** Class to apply to  */
	protected inFocusFieldClass: string;

	/** Logical processor that handles ContactForm behavior. */
	protected processor: ContactFormStateMachine;

	/**
	 * @param config Configuration data for the controller.
	 */
	private constructor({
		activeStateClass,
		inFocusFieldClass,
	}: ContactFormControllerConfig) {
		super();

		this.inFocusFieldClass = inFocusFieldClass;
		this.processor = new ContactFormStateMachine(activeStateClass);
		this.onFieldRegistration = this.onFieldRegistration.bind(this);
	}

	/** Ready the controller for registration of ContactForms. */
	public initialize(): void {
		FormFieldController.instance.addRegistrationListener(
			this.onFieldRegistration
		);

		super.initialize();
	}

	/**
	 * Implement state-machine behavior of newly registered ContactForm.
	 *
	 * @param element ContactForm to be programed.
	 * @returns The input ContactForm extended with the StatefulContactForm interface.
	 */
	public program(element: ContactForm): StatefulContactForm {
		const extendedElement = this.processor.extend(element);

		function loadAndProcess(): void {
			this.processor.load(extendedElement);
			this.processor.process();
		}

		FormFieldController.instance.load(extendedElement.mainField.id);
		FormFieldController.instance.current.statesData.active.enterHook.set(
			loadAndProcess.bind(this)
		);
		FormFieldController.instance.current.statesData.idle.enterHook.set(
			loadAndProcess.bind(this)
		);

		return extendedElement;
	}

	/**
	 * Implement FormField behavior specific to FormFields that descend from a ContactForm.
	 *
	 * @param statefulField StatefulFormField that may or may not be a descendant of a ContactForm.
	 */
	protected onFieldRegistration(statefulField: StatefulFormField): void {
		if (statefulField.element.closest('.contact-form')) {

			statefulField.element.addEventListener(
				'mouseenter',
				() => {
					statefulField
						.element
						.classList
						.add(this.inFocusFieldClass);
				}
			);

			statefulField.element.addEventListener(
				'mouseleave',
				() => {
					if (!document.activeElement.isSameNode(statefulField.input)) {
						statefulField
							.element
							.classList
							.remove(this.inFocusFieldClass);
					}
				},
			);

			statefulField.element.addEventListener(
				'focusin',
				() => {
					statefulField
						.element
						.classList
						.add(this.inFocusFieldClass);
				}
			);

			statefulField.element.addEventListener(
				'focusout',
				() => {
					statefulField
						.element
						.classList
						.remove(this.inFocusFieldClass);
				}
			);
		}
	}

}
