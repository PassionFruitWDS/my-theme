import ControllerBase from '../util/controllers/ControllerBase';
import FormFieldStateMachine from './FormFieldStateMachine';
import FormField from './FormField';
import { StatefulFormField } from './FormFieldTypeDecs';

/** Configuration needed to initialize a form field controller. */
export type FormFieldControllerConfig = {
	activeStateClass: string;
};

/**
 * Oversees registration and behavior implementation for ContactForm components.
 * Follows singleton pattern and must be initialized prior to use.
 */
export default class FormFieldController extends ControllerBase<
	FormField,
	StatefulFormField
> {

	// --- STATIC ---

	/** Cache of the instance of the singleton. */
	private static cachedInstance: FormFieldController | undefined;

	/** Instance of the singleton. */
	public static get instance(): FormFieldController {
		if (!FormFieldController.cachedInstance) {
			throw Error('Attempted to access controller instance before initialization');
		}

		return FormFieldController.cachedInstance;
	}

	/**
	 * Construct the instance of the controller.
	 *
	 * @param config Configuration data for the controller.
	 */
	public static constructInstance(config: FormFieldControllerConfig): void {
		if (!FormFieldController.cachedInstance) {
			FormFieldController.cachedInstance = new FormFieldController(
				config
			);
		} else {
			throw Error('Attempted to construct more than one instance of the singleton.');
		}
	}

	// --- INSTANCE ---

	/** Logical processor that handles FormField behavior. */
	protected processor: FormFieldStateMachine;

	/**
	 * @param config Configuration data for the controller.
	 */
	private constructor({ activeStateClass }: FormFieldControllerConfig) {
		super();
		this.processor = new FormFieldStateMachine(activeStateClass);
	}

	/** Ready the controller for registration of FormFields. */
	public initialize(): void {
		super.initialize();
	}

	/**
	 * Implement state-machine behavior of newly registered FormField.
	 *
	 * @param element FormField to be programmed.
	 * @returns The input FormField extended with the StatefulFormField interface.
	 */
	protected program(element: FormField): StatefulFormField {
		const extendedElement = this.processor.extend(element);

		extendedElement.input.addEventListener(
			'input',
			() => {
				this.processor.load(extendedElement);
				this.processor.process();
			}
		);

		return extendedElement;
	}

}
