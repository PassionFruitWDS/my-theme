import ControllerBase from '../util/controllers/ControllerBase';
import ContactForm from './ContactForm';
import ContactFormStateMachine from './ContactFormStateMachine';
import { StatefulContactForm } from './ContactFormTypeDecs';
import FormFieldController from '../form-field/FormFieldController';

/** Configuration needed to initialize a ContactFormController. */
export type ContactFormControllerConfig = {
	activeStateClass: string;
};

/**
 * Oversees registration and behavior implementation for ContactForm components.
 * Follows singleton pattern and must be initialized prior to use.
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
	 * Initialize the controller by constructing its instance.
	 *
	 * @param config Configuration data for the controller.
	 */
	public static initialize(config: ContactFormControllerConfig): void {
		if (!ContactFormController.cachedInstance) {
			ContactFormController.cachedInstance = new ContactFormController(
				config
			);
			ContactFormController.instance.initialize();
		}
	}

	// --- INSTANCE ---

	/** Logical processor that handles ContactForm behavior. */
	protected processor: ContactFormStateMachine;


	/**
	 * @param config Configuration data for the controller.
	 */
	private constructor({ activeStateClass }: ContactFormControllerConfig) {
		super();
		this.processor = new ContactFormStateMachine(activeStateClass);
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

}
