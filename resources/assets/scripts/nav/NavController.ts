/** implements nav-bar behavior */
export default class NavController {

	/** css class for 'active' objects */
	private static activeStateClass = 'is-active';

	constructor(
		/** nav menu element */
		private readonly nav: HTMLElement,
		/** hamburger button element */
		private readonly hamburger: HTMLElement,
	) {}

	/** apply intended behavior to the element */
	public initialize(): void {
		this.hamburger.addEventListener('click', this.toggleIsActive.bind(this));
	}

	/** toggle element states via css class */
	private toggleIsActive(): void {
		this.hamburger.classList.toggle(NavController.activeStateClass);
		this.nav.classList.toggle(NavController.activeStateClass);
	}

}
