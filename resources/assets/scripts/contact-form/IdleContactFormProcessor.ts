import StateProcessorBase from '../util/state-modeling/StateProcessorBase';
import { StatefulContactForm, ContactFormHookCallback, ContactFormStates } from './ContactFormTypeDecs';
import ContactForm from './ContactForm';
import StateData from '../util/state-modeling/StateData';

type F = ContactFormHookCallback;
type States = typeof ContactFormStates;
type State = keyof States;

export default class IdleContactFormProcessor extends StateProcessorBase<
	States,
	F,
	'idle',
	ContactForm,
	StatefulContactForm
> {

	public process(): void {
		this._result = { resolvedTransition: this.resolvedTransition };
	}

	constructor() {
		super('idle');
	}

	/** State, if any, that the loaded 'idle' contact form should transition to. */
	public get resolvedTransition(): null | State {

		if (this.shouldTransitionToActive) return 'active';

		return null;
	}

	protected get shouldTransitionToActive(): boolean {
		return this.current.statesData.shared.mainFieldIsActive();
	}

	protected makeNewDataFor(): StatefulContactForm['statesData']['idle'] {
		return new StateData<States, F>(this.canSendTo);
	}

	/** States to which an 'idle' contact form can be transitioned. */
	public readonly canSendTo: ['active'] = ['active'];

}
