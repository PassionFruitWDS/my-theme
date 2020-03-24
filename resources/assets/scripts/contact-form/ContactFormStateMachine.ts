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

	// eslint-disable-next-line class-methods-use-this
	protected makeSharedStateDataFor(obj: ContactForm): StatefulContactForm['statesData']['shared'] {
		const { mainField } = obj;
		FormFieldController.instance.register(mainField);
		const statefulMainField = FormFieldController.instance.current;
		const shared = {
			mainFieldIsActive: (): boolean => statefulMainField.state === 'active',
		};

		return shared;
	}

	protected stateProcessors = {
		idle: new IdleContactFormProcessor(),
		active: new ActiveContactFormProcessor(),
	};

	protected readonly initialState = 'idle';


}
