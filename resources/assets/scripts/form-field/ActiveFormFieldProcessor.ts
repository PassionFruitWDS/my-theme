import StateProcessorBase from '../util/state-modeling/StateProcessorBase';
import { FormFieldStates, StatefulFormField, FormFieldHookCallback } from './FormFieldTypeDecs';
import StateData from '../util/state-modeling/StateData';
import FormField from './FormField';

type F = FormFieldHookCallback;
type States = typeof FormFieldStates;
type State = keyof States;

export default class ActiveFormFieldProcessor extends StateProcessorBase<
	States,
	F,
	'active',
	FormField & { statesData: { shared: StatefulFormField['statesData']['shared'] } },
	StatefulFormField
> {

	/** List of states accessible from `active`. */
	public readonly canSendTo: ['idle'] = ['idle'];

	/** State, if any, that the loaded `active` FormField should transition to. */
	protected get resolvedTransition(): null | State {

		if (!this.current.hasInput) return this.canSendTo[0];

		return null;
	}

	/**
	 * @param cssClass Class used to demark `active` FormField elements.
	 */
	constructor(private readonly cssClass) {
		super('active');
	}

	/**
	 * Execute canonical `active` state entrance behavior.
	 *
	 * @param target StatefulFormField to be manipulated.
	 */
	protected doOnEnter(target: StatefulFormField): void {
		this.load(target);
		this.markActive();
	}

	/**
	 * Execute canonical `active` state exit behavior.
	 *
	 * @param target StatefulFormField to be manipulated.
	 */
	protected doOnExit(target: StatefulFormField): void {
		this.load(target);
		this.unmarkActive();
	}

	/**
	 * Create and initialize the StateData for a FormField's `active` state.
	 *
	 * @param obj FormField for which a StateData object will be created.
	 * @returns Initialized StateData of the input FormField's `active` state.
	 */
	protected makeNewDataFor(obj: FormField): StatefulFormField['statesData']['active'] {
		const data = new StateData<States, F>(this.canSendTo);

		data.exitHook.set(
			this.doOnExit.bind(this, obj)
		);
		data.enterHook.set(
			this.doOnEnter.bind(this, obj)
		);

		return data;
	}

	/** Mark the current FormField as `active` by applying the appropriate class. */
	private markActive(): void {
		this.current.formField.addClass(this.cssClass);
	}

	/** Resolve the state, if any, to which the loaded FormField should transition. */
	public process(): void {
		this._result = { resolvedTransition: this.resolvedTransition };
	}

	/** Unmark the current FormField from being `active` by removing the appropriate class. */
	private unmarkActive(): void {
		this.current.formField.removeClass(this.cssClass);
	}

}
