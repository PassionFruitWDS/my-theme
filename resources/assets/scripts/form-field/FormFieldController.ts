import 'jquery';
import ControllerBase from '../util/controllers/ControllerBase';
import FormFieldStateMachine from './FormFieldStateMachine';
import FormField from './FormField';
import { StatefulFormField } from './FormFieldTypeDecs';

/** Implements form field behavior. */
export default class FormFieldController extends ControllerBase<
	FormField,
	StatefulFormField
> {

	private static cachedInstance: FormFieldController | undefined;

	public static get instance(): FormFieldController {
		if (!FormFieldController.cachedInstance) {
			FormFieldController.cachedInstance = new FormFieldController();
		}

		return FormFieldController.cachedInstance;
	}

	protected processor = new FormFieldStateMachine();

	/** Initialize the controller. */
	public initialize(): void {
		super.initialize();
	}

	/** Implement behavior of newly registered element through callbacks. */
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
