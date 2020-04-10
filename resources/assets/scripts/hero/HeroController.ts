import ContactFormController from '../contact-form/ContactFormController';
import ContactForm from '../contact-form/ContactForm';
import Shim from '../util/misc/Shim';

/** Oversees behavior implementation for a page's HeroComponent. */
export default class HeroController {

	/** Store of the Hero's Shim. */
	private _shim: Shim;

	/** Hero's Shim object. The shim prevents the Hero's grid from responsively resizing while inserted. */
	private get shim(): Shim {
		if (!this._shim) {
			this._shim = new Shim(this.element, { gridArea: 'shim' });
		}

		return this._shim;
	}

	/** Hero grid's shim row height. */
	private get shimRowHeight(): string {
		const rowHeights = window.getComputedStyle(this.element).gridTemplateRows.split(' ');
		const shimRowIndex = 2;
		const shimHeight = rowHeights[shimRowIndex];
		return shimHeight;
	}

	/**
	 * Create a controller for a page's Hero component.
	 *
	 * @param element Hero component's root element.
	 */
	constructor(private element: HTMLElement) {
		this.lockGridSize = this.lockGridSize.bind(this);
		this.unlockGridSize = this.unlockGridSize.bind(this);
	}

	/** Implement behavior of the Hero component and its sub-components. */
	public initialize(): void {
		const form = new ContactForm(this.element.querySelector('.contact-form'));
		const statefulForm = ContactFormController.instance.register(form);
		statefulForm.statesData.idle.exitHook.set(this.lockGridSize);
		statefulForm.statesData.idle.enterHook.set(this.unlockGridSize);
	}

	/** Enable responsive resizing of the Hero's grid. */
	private unlockGridSize(): void {
		this.shim.remove();
	}

	/** Disable responsive resizing of the Hero's grid */
	private lockGridSize(): void {
		this.shim.height = this.shimRowHeight;
		this.shim.insert();
	}

}
