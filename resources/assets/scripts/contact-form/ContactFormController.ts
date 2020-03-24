import 'jquery';
import ControllerBase from '../util/controllers/ControllerBase';
import ContactForm from './ContactForm';
import ContactFormStateMachine from './ContactFormStateMachine';
import { StatefulContactForm } from './ContactFormTypeDecs';
import FormFieldController from '../form-field/FormFieldController';

/** Implements contact form behavior. */
export default class ContactFormController extends ControllerBase<
	ContactForm,
	StatefulContactForm
> {

	private static cachedInstance: ContactFormController | undefined;

	public static get instance(): ContactFormController {
		if (!ContactFormController.cachedInstance) {
			ContactFormController.cachedInstance = new ContactFormController();
		}

		return ContactFormController.cachedInstance;
	}

	protected processor = new ContactFormStateMachine();

	/**
	 * Initialize the controller.
	 */
	public initialize(): void {
		super.initialize();
	}

	/** Implement contact form behavior. */
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
