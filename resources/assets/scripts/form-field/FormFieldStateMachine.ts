import StateMachineBase from '../util/state-modeling/StateMachineBase';
import { FormFieldStates, FormFieldHookCallback, StatefulFormField } from './FormFieldTypeDecs';
import ActiveFormFieldProcessor from './ActiveFormFieldProcessor';
import IdleFormFieldProcessor from './IdleFormFieldProcessor';
import FormField from './FormField';

/** Logic that controls state transitions of FormField elements. */
export default class FormFieldStateMachine extends StateMachineBase<
	typeof FormFieldStates,
	FormFieldHookCallback,
	FormField,
	StatefulFormField
> {

	/** Initial state for StatefulFormFields. */
	protected readonly initialState = 'idle';

	/** EMPTY. Member included to satisfy requirements of abstract `super`. */
	protected makeSharedStateDataFor = (_obj: FormField): null => null;

	/** Processors that resolve state transitions. */
	protected stateProcessors: {
		active: ActiveFormFieldProcessor;
		idle: IdleFormFieldProcessor;
	};

	/**
	 * @param activeStateClass CSS class associated with the active state.
	 */
	constructor(activeStateClass: string) {
		super();

		this.stateProcessors = {
			active: new ActiveFormFieldProcessor(activeStateClass),
			idle: new IdleFormFieldProcessor(),
		};
	}

}
