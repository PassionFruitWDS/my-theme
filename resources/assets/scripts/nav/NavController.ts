import 'jquery';

/** implements nav-bar behavior */
export default class NavController {

	/** css class for 'active' objects */
	private static activeStateClass = 'is-active';

	constructor(
		/** nav menu element */
		private readonly nav: JQuery<HTMLElement>,
		/** hamburger button element */
		private readonly hamburger: JQuery<HTMLElement>,
	) {}

	/** apply intended behavior to the element */
	public initialize(): void {
		this.hamburger.on('click', this.toggleIsActive.bind(this));
	}

	/** toggle element states via css class */
	private toggleIsActive(): void {
		this.hamburger.toggleClass(NavController.activeStateClass);
		this.nav.toggleClass(NavController.activeStateClass);
	}

}
