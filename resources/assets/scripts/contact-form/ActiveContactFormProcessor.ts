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

	public process(): void {
		this._result = { resolvedTransition: this.resolvedTransition };
	}

	constructor() {
		super('active');
	}

	/** State, if any, that the loaded 'active' contact form should transition to. */
	protected get resolvedTransition(): null | State {

		if (this.shouldTransitionToIdle) return 'idle';

		return null;
	}

	/** Indicator of whether the current processing target should transition to state 'idle' */
	protected get shouldTransitionToIdle(): boolean {

		const { currentStateData } = this;
		const { currentSharedData } = this;

		return (!currentStateData.subfieldIsActive.some((value) => value))
			&& (!currentSharedData.mainFieldIsActive());
	}

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
		this.unlockVerticalMargins();
		this.disableSubmitButton();
		this.removeStyle();
	}

	/**
	 * Execute 'active' state onEnter behavior for a target contact form.
	 *
	 * @param target Stateful contact form to be manipulated.
	 */
	protected doOnEnter(target: StatefulContactForm): void {
		this.load(target);
		this.applyStyle();
		this.lockVerticalMargins();
		this.expandForm();
		this.registerNewFormFields();
		this.enableSubmitButton();
	}

	/** Register non-main form fields with their controller. */
	protected registerNewFormFields(): void {
		const { current } = this;

		current.rawNotMainFields.toArray().forEach(
			this.registerNewFormField.bind(this)
		);
	}

	/**
	 * Register a form field with its controller.
	 *
	 * @param field Raw form field to be registered with its controller.
	 */
	protected registerNewFormField(field: HTMLElement): void {

		const { notifyIsActive, notifyIsNotActive } = this
			.makeFormFieldDataAndBinders();

		const formField = new FormField($(field));
		FormFieldController.instance.register(formField);
		const statefulFormField = FormFieldController.instance.current;
		const formFieldActiveStateData = statefulFormField.statesData.active;

		formFieldActiveStateData.enterHook.set(notifyIsActive);
		formFieldActiveStateData.exitHook.set(notifyIsNotActive);
	}

	/** Create data and data binding callbacks for subfield state indication flags */
	protected makeFormFieldDataAndBinders():
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

		current.rawContactForm.append(current.template.html());
	}

	/** Shrink the form by removing it's 'expanded'/'active' state fields. */
	protected shrinkForm(): void {
		const { current } = this;

		current.rawNotMainFields.remove();
		current.statesData.active.subfieldIsActive = [];
	}

	/** Lock the top/bottom margins to their current value. */
	protected lockVerticalMargins(): void {
		const { current } = this;

		current.rawContactForm.css('margin', `${current.marginTop} 0`);
	}

	/** Enable responsive top/bottom margin resizing. */
	protected unlockVerticalMargins(): void {
		this.current.rawContactForm.css('margin', 'auto 0');
	}

	/** Enable the form's submission button. */
	protected enableSubmitButton(): void {
		this.current.submitButton.removeAttr('disabled');
	}

	/** Disable the form's submit button. */
	protected disableSubmitButton(): void {
		this.current.submitButton.attr('disabled', '');
	}

	/**
	 * Apply the form field's 'active' state style by adding the appropriate css class.
	 */
	protected applyStyle(): void {
		this.current.rawContactForm.addClass(
			ActiveContactFormProcessor.cssClass
		);
	}

	/**
	 * Remove the form field's 'active' state style by removing the appropriate css class.
	 */
	protected removeStyle(): void {
		this.current.rawContactForm.removeClass(
			ActiveContactFormProcessor.cssClass
		);
	}

	/** Css class that contains form fields' 'active' state style rules. */
	protected static readonly cssClass = 'contact-form--is-active';

}
