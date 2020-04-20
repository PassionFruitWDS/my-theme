import StateProcessorBase from '../util/state-modeling/StateProcessorBase';
import StateData from '../util/state-modeling/StateData';
import { StatefulContactForm, ContactFormStates, ContactFormHookCallback } from './ContactFormTypeDecs';
import FormFieldController from '../form-field/FormFieldController';
import FormField from '../form-field/FormField';
import ContactForm from './ContactForm';

type F = ContactFormHookCallback;
type States = typeof ContactFormStates;
type State = keyof States;

export default class ActiveContactFormProcessor extends StateProcessorBase<
	States,
	F,
	'active',
	ContactForm,
	StatefulContactForm
> {

	/**
	 * @param cssClass Class associated with the 'active' state.
	 */
	constructor(protected readonly cssClass: string) {
		super('active');
	}

	/**
	 * Create 'active' state data for a ContactForm component.
	 *
	 * @param obj ContactForm component for which 'active' state data will be created.
	 */
	protected makeNewDataFor(obj: ContactForm): StatefulContactForm['statesData']['active'] {

		type ReturnT = ReturnType<ActiveContactFormProcessor['makeNewDataFor']>;
		type PReturnT = Partial<ReturnT>;

		const data: PReturnT = new StateData<States, F>(this.canSendTo);
		data.subfieldIsActive = [];

		data.enterHook.set(
			this.doOnEnter.bind(this, obj)
		);
		data.exitHook.set(
			this.doOnExit.bind(this, obj)
		);

		return (data as ReturnT);
	}

	/** Resolve the transition, if any, that the loaded ContactForm should make. */
	public process(): void {
		this._result = { resolvedTransition: this.resolvedTransition };
	}

	/** State, if any, that the loaded ContactForm should transition to. */
	protected get resolvedTransition(): null | State {

		if (this.shouldTransitionToIdle) return 'idle';

		return null;
	}

	/** Indicator of whether the loaded ContactForm should transition to state 'idle' */
	protected get shouldTransitionToIdle(): boolean {

		const { currentStateData } = this;
		const { currentSharedData } = this;

		return (!currentStateData.subfieldIsActive.some((value) => value))
			&& (!currentSharedData.mainFieldIsActive());
	}

	/** List of states accessible from 'active'. */
	public readonly canSendTo: ['idle'] = ['idle'];

	/**
	 * Execute 'active' state onExit behavior for a target contact form.
	 *
	 * @param target Stateful contact form to be manipulated.
	 */
	protected doOnExit(target: StatefulContactForm): void {
		this.load(target);
		this.shrinkForm();
		this.disableSubmitButton();
		this.removeStyle();
	}

	/**
	 * Execute 'active' state onEnter behavior for a ContactForm.
	 *
	 * @param target Stateful contact form to be manipulated.
	 */
	protected doOnEnter(target: StatefulContactForm): void {
		this.load(target);
		this.applyStyle();
		this.expandForm();
		this.registerNewFormFields();
		this.enableSubmitButton();
	}

	/** Register non-main FormFields with their controller. */
	protected registerNewFormFields(): void {
		const { current } = this;

		current.nonMainFieldRoots.forEach(
			this.registerNewFormField.bind(this)
		);
	}

	/**
	 * Register a FormField component with its controller.
	 *
	 * @param field FormField component root to be registered with its controller.
	 */
	protected registerNewFormField(field: HTMLElement): void {

		const formField = FormFieldController.instance.register(
			new FormField(field)
		);

		const callbacks = this.makeFormFieldTransitionCallbacks();
		formField.statesData.active.enterHook.set(callbacks.notifyIsActive);
		formField.statesData.active.exitHook.set(callbacks.notifyIsNotActive);
	}

	/** Create data and data binding callbacks for subfield state indication flags */
	protected makeFormFieldTransitionCallbacks():
	{
		notifyIsActive: () => void;
		notifyIsNotActive: () => void;
	} {

		const { currentStateData } = this;
		const pos = currentStateData.subfieldIsActive.length;
		currentStateData.subfieldIsActive.push(false);

		const notifyIsActive = (): void => {
			currentStateData.subfieldIsActive[pos] = true;
		};

		const notifyIsNotActive = (): void => {
			currentStateData.subfieldIsActive[pos] = false;
		};

		return { notifyIsActive, notifyIsNotActive };
	}

	/** Expand the form to it's 'active' state using template content. */
	protected expandForm(): void {
		const { current } = this;

		const clone = current.template.content.cloneNode(true);
		current.element.append(clone);
	}

	/** Shrink the form by removing it's 'expanded'/'active' state fields. */
	protected shrinkForm(): void {
		const { current } = this;

		current.nonMainFieldRoots.forEach((node) => node.remove());
		current.statesData.active.subfieldIsActive = [];
	}

	/** Enable the form's submission button. */
	protected enableSubmitButton(): void {
		this.current.submitButton.removeAttribute('disabled');
	}

	/** Disable the form's submit button. */
	protected disableSubmitButton(): void {
		this.current.submitButton.setAttribute('disabled', '');
	}

	/**
	 * Apply the form field's 'active' state style by adding the appropriate css class.
	 */
	protected applyStyle(): void {
		this.current.element.classList.add(
			this.cssClass
		);
	}

	/**
	 * Remove the form field's 'active' state style by removing the appropriate css class.
	 */
	protected removeStyle(): void {
		this.current.element.classList.remove(
			this.cssClass
		);
	}

}
