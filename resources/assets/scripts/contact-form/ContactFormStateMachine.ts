import StateMachineBase from '../util/state-modeling/StateMachineBase';
import { ContactFormStates, ContactFormHookCallback, StatefulContactForm } from './ContactFormTypeDecs';
import ActiveContactFormProcessor from './ActiveContactFormProcessor';
import IdleContactFormProcessor from './IdleContactFormProcessor';
import FormFieldController from '../form-field/FormFieldController';
import ContactForm from './ContactForm';

export default class ContactFormStateMachine extends StateMachineBase<
	typeof ContactFormStates,
	ContactFormHookCallback,
	ContactForm,
	StatefulContactForm
> {

	protected readonly initialState = 'idle';

	protected stateProcessors: {
		idle: IdleContactFormProcessor;
		active: ActiveContactFormProcessor;
	};

	constructor(activeStateClass: string) {
		super();
		this.stateProcessors = {
			idle: new IdleContactFormProcessor(),
			active: new ActiveContactFormProcessor(activeStateClass),
		};
	}

	protected readonly makeSharedStateDataFor = (obj: ContactForm): StatefulContactForm['statesData']['shared'] => {
		const { mainField } = obj;
		FormFieldController.instance.register(mainField);
		const statefulMainField = FormFieldController.instance.current;
		const shared = {
			mainFieldIsActive: (): boolean => statefulMainField.state === 'active',
		};

		return shared;
	};

}
