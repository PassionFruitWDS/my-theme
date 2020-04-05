export default class TermsController {

	static readonly termsHtmlId = '#terms';

	static readonly templateHtmlId = '#terms-template';


	protected readonly link: JQuery<HTMLElement>;

	constructor() {
		this.link = $('#terms-link');
	}

	public initialize(): void {
		this.link.on('click', TermsController.onLinkClick);
	}

	protected static onLinkClick(): void {
		TermsController.makeTermsPopup();
		TermsController.initializePopup();
	}

	protected static makeTermsPopup(): void {
		$($('#terms-template').html()).appendTo('body');
	}

	protected static initializePopup(): void {
		$('.terms__close').on('click', TermsController.removeTerms);
	}

	protected static removeTerms(): void {
		$('#terms').remove();
	}

}
