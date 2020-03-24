import StateMachineBase from '../util/state-modeling/StateMachineBase';
import { FormFieldStates, FormFieldHookCallback, StatefulFormField } from './FormFieldTypeDecs';
import ActiveFormFieldProcessor from './ActiveFormFieldProcessor';
import IdleFormFieldProcessor from './IdleFormFieldProcessor';
import FormField from './FormField';

export default class FormFieldStateMachine extends StateMachineBase<
	typeof FormFieldStates,
	FormFieldHookCallback,
	FormField,
	StatefulFormField
> {

	// eslint-disable-next-line class-methods-use-this
	protected makeSharedStateDataFor(_obj: FormField): null {
		return null;
	}

	protected stateProcessors = {
		active: new ActiveFormFieldProcessor(),
		idle: new IdleFormFieldProcessor(),
	};

	protected readonly initialState = 'idle';

}
