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
	FormField,
	StatefulFormField
> {

	public process(): void {
		this._result = { resolvedTransition: this.resolvedTransition };
	}

	constructor() {
		super('active');
	}

	/** State, if any, that the loaded 'active' form field should transition to. */
	public get resolvedTransition(): null | State {

		if (!this.current.hasInput) return this.canSendTo[0];

		return null;
	}

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

	/** List of states accessible from 'active'. */
	public readonly canSendTo: ['idle'] = ['idle'];

	protected doOnExit(target: StatefulFormField): void {
		this.load(target);
		this.removeStyle();
	}

	protected doOnEnter(target: StatefulFormField): void {
		this.load(target);
		this.applyStyle();
	}

	/**
	 * Apply the form field's 'active' state style by adding the appropriate css class.
	 *
	 * @param obj Form field to which the style will be applied.
	 */
	private applyStyle(): void {
		this.current.formField.addClass(ActiveFormFieldProcessor.cssClass);
	}

	/**
	 * Remove the form field's 'active' state style by removing the appropriate css class.
	 *
	 * @param obj Form field from which the style will be removed.
	 */
	private removeStyle(): void {
		this.current.formField.removeClass(ActiveFormFieldProcessor.cssClass);
	}

	/** Css class that contains form fields' 'active' state style rules. */
	private static readonly cssClass = 'form-field--active-state';

}
