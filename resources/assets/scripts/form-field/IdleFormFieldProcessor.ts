import StateProcessorBase from '../util/state-modeling/StateProcessorBase';
import { FormFieldStates, StatefulFormField, FormFieldHookCallback } from './FormFieldTypeDecs';
import StateData from '../util/state-modeling/StateData';
import FormField from './FormField';

type F = FormFieldHookCallback;
type States = typeof FormFieldStates;
type State = keyof States;

export default class IdleFormFieldProcessor extends StateProcessorBase<
	States,
	F,
	'idle',
	FormField,
	StatefulFormField
> {

	public process(): void {
		this._result = { resolvedTransition: this.resolvedTransition };
	}

	constructor() {
		super('idle');
	}

	/** State, if any, that the loaded 'idle' form field should transition to. */
	public get resolvedTransition(): null | State {

		if (this.current.hasInput) return this.canSendTo[0];

		return null;
	}

	protected makeNewDataFor(): StatefulFormField['statesData']['idle'] {
		return new StateData<States, F>(this.canSendTo);
	}

	/** List of states accessible from 'idle'. */
	public readonly canSendTo: ['active'] = ['active'];

}
