import 'jquery';
import ControllerBase from '../util/controllers/ControllerBase';
import FormFieldStateMachine from './FormFieldStateMachine';
import FormField from './FormField';
import { StatefulFormField } from './FormFieldTypeDecs';

/** Configuration needed to initialize a form field controller. */
export type FormFieldControllerConfig = {
	activeStateClass: string;
};

/** Singleton controller for form field interfaces. */
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
	 * Initialize the controller using the given configuration.
	 *
	 * @param config Configuration data for the controller.
	 */
	public static initialize(config: FormFieldControllerConfig): void {
		if (!FormFieldController.cachedInstance) {
			FormFieldController.cachedInstance = new FormFieldController(
				config
			);
		}
		FormFieldController.instance.initialize();
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

	/**
	 * Implement state-machine behavior of newly registered FormField.
	 *
	 * @param element FormField to be programmed.
	 * @returns The input FormField extended with the StatefulFormField interface.
	 */
	protected program(element: FormField): StatefulFormField {
		const extendedElement = this.processor.extend(element);

		function loadAndProcess(): void {
			this.processor.load(extendedElement);
			this.processor.process();
		}

		extendedElement.input.on('input', loadAndProcess.bind(this));

		return extendedElement;
	}

}
