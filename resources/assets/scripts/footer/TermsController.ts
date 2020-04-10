export default class TermsController {

	static readonly termsId = 'terms';

	static readonly templateId = 'terms-template';

	static readonly linkId = 'terms-link';

	protected readonly link: HTMLElement;

	private _template: HTMLTemplateElement;

	protected get template(): HTMLTemplateElement {
		if (!this._template) {
			this._template = document.querySelector(
				`#${TermsController.templateId}`
			);
		}

		return this._template;
	}

	constructor() {
		this.link = document.querySelector(`#${TermsController.linkId}`);

		this.onLinkClick = this.onLinkClick.bind(this);
	}

	public initialize(): void {
		this.link.addEventListener('click', this.onLinkClick);
	}

	protected onLinkClick(): void {
		this.makeTermsPopup();
		TermsController.initializePopup();
	}

	protected makeTermsPopup(): void {
		const clone = this.template.content.cloneNode(true);
		document.querySelector('body').append(clone);
	}

	protected static initializePopup(): void {
		const closeButton = document.querySelector('.terms__close');
		closeButton.addEventListener('click', TermsController.removeTerms);
	}

	protected static removeTerms(): void {
		document.querySelector(`#${TermsController.termsId}`).remove();
	}

}
