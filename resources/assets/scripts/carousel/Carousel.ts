import Controllable from '../util/controllers/Controllable';
import Transition from '../util/misc/Transition';

export class Carousel extends Controllable {

	private _backButton: HTMLElement;

	protected get backButton(): HTMLElement {
		if (!this._backButton) {
			this._backButton = this.element.querySelector(`#${this.element.id}--back`);
		}

		return this._backButton;
	}

	private _content: HTMLElement;

	protected get content(): HTMLElement {
		if (!this._content) {
			this._content = this.element.querySelector('.copy');
		}

		return this._content;
	}

	protected get currData(): CarouselData {
		return this.getDataAt(this.index);
	}

	private _frwdButton: HTMLElement;

	protected get frwdButton(): HTMLElement {
		if (!this._frwdButton) {
			this._frwdButton = this.element.querySelector(`#${this.element.id}--frwd`);
		}

		return this._frwdButton;
	}

	private _images: Map<string, HTMLElement> = new Map<string, HTMLElement>();

	protected images = {
		get: (idSlug: string): HTMLElement => {
			if (!this._images.has(idSlug)) {
				this._images.set(
					idSlug,
					this.towers.querySelector(`#${this.towers.id}--${idSlug}`)
				);
			}
			return this._images.get(idSlug);
		},
	};

	private index = 0;

	protected get nextData(): CarouselData {
		return this.getDataAt(this.index + 1);
	}

	private _nextTitle: HTMLElement;

	protected get nextTitle(): HTMLElement {
		if (!this._nextTitle) {
			this._nextTitle = this.element.querySelector(`#${this.element.id}--next`);
		}

		return this._nextTitle;
	}

	protected get prevData(): CarouselData {
		return this.getDataAt(this.index - 1);
	}

	private _prevTitle: HTMLElement;

	protected get prevTitle(): HTMLElement {
		if (!this._prevTitle) {
			this._prevTitle = this.element.querySelector(`#${this.element.id}--prev`);
		}

		return this._prevTitle;
	}

	private _title: HTMLElement;

	protected get title(): HTMLElement {
		if (!this._title) {
			this._title = this.element.querySelector(`#${this.element.id}--current`);
		}

		return this._title;
	}

	protected get titlesData(): { element: HTMLElement; text: string }[] {
		return [
			{
				element: this.title,
				text: this.currData.title,
			},
			{
				element: this.prevTitle,
				text: this.prevData.title,
			},
			{
				element: this.nextTitle,
				text: this.nextData.title,
			},
		];
	}

	private _towers: HTMLElement;

	protected get towers(): HTMLElement {
		if (!this._towers) {
			this._towers = this.element.querySelector('.towers');
		}

		return this._towers;
	}

	private _towersHtmlId: string;

	protected get towersHtmlId(): string {
		if (!this._towersHtmlId) {
			this._towersHtmlId = this.towers.id;
		}

		return this._towersHtmlId;
	}

	protected transition = '0.3s ease-in';

	constructor(
		public readonly element: HTMLElement,
		protected readonly data: CarouselData[]
	) {
		super();

		// Bind callbacks
		this.renderNext = this.renderNext.bind(this);
		this.renderPrev = this.renderPrev.bind(this);
	}

	public initialize(): void {
		// Set listeners
		this.backButton.addEventListener('click', this.renderPrev);
		this.frwdButton.addEventListener('click', this.renderNext);
		this.prevTitle.addEventListener('click', this.renderPrev);
		this.nextTitle.addEventListener('click', this.renderNext);

		// Render initial data
		this.setContentOf(this.content);
		this.title.innerText = this.currData.title;
		this.prevTitle.innerText = this.prevData.title;
		this.nextTitle.innerText = this.nextData.title;
		const idSlugs = Object.keys(this.currData.imgSources);
		idSlugs.forEach((idSlug): void => {
			const image = this.images.get(idSlug);
			const { alt, src } = this.currData.imgSources[idSlug];
			image.setAttribute('src', src);
			image.setAttribute('alt', alt);
		});
	}

	protected display(index: number): void {
		let direction: AnimationDirection;
		if (index > this.index) {
			direction = 'forward';
		} else if (index < this.index) {
			direction = 'back';
		}

		this.index = index % this.data.length;

		if (direction) {
			this.animatedTransition(direction);
		}
	}

	protected renderNext(): void {
		this.display(this.index + 1);
	}

	protected renderPrev(): void {
		this.display(this.index - 1);
	}

	protected getDataAt(index: number): CarouselData {
		const modIndex = index % this.data.length;
		if (modIndex < 0) {
			return this.data[modIndex + this.data.length];
		}

		return this.data[index % this.data.length];
	}

	protected animatedTransition(direction: AnimationDirection): void {
		this.transitionTitles(direction);
		this.transitionImages();
		this.transitionContent(direction);
	}

	protected transitionContent(_direction: AnimationDirection): void {
		const outFinalStyle: Partial<CSSStyleDeclaration> = {
			opacity: '0',
		};

		const inInitialStyle: Partial<CSSStyleDeclaration> = {
			opacity: '0',
		};

		const inFinalStyle: Partial<CSSStyleDeclaration> = {
			opacity: '1',
			transform: 'translateX(0)',
		};

		const onOutComplete = (element: HTMLElement): void => {
			this.setContentOf(element);
		};

		const transition = new Transition(
			this.content,
			{
				finalStyle: outFinalStyle,
				transition: {
					duration: 300,
					timingFunc: 'ease-in',
				},
				callback: onOutComplete,
				optionsOfNext: {
					initialStyle: inInitialStyle,
					finalStyle: inFinalStyle,
					transition: {
						duration: 300,
						timingFunc: 'ease-out',
					},
				},
			}
		);

		transition.do();
	}

	protected setContentOf(element: HTMLElement): void {
		const { content } = this.currData;

		function appendNewParagraph(text: string): void {
			const p = document.createElement('p');
			p.innerText = text;
			element.append(p);
		}

		element.querySelectorAll(':scope > *').forEach((child) => child.remove());
		if (Array.isArray(content)) {
			content.forEach(appendNewParagraph);
		} else {
			appendNewParagraph(content);
		}
	}

	protected transitionImages(): void {

		const outInitialStyle: Partial<CSSStyleDeclaration> = {
			animation: 'float paused',
		};

		const outFinalStyle: Partial<CSSStyleDeclaration> = {
			opacity: '0',
			transform: 'translateY(-20px)',
		};

		const inFinalStyle: Partial<CSSStyleDeclaration> = {
			opacity: '1',
			transform: 'translateY(0)',
		};

		const onInComplete = (element: HTMLElement): void => {
			element.style.setProperty('animation', '');
		};

		const imgIdSlugs = Object.keys(this.currData.imgSources);
		imgIdSlugs.forEach((idSlug) => {
			const image = this.images.get(idSlug);
			const { src, alt } = this.currData.imgSources[idSlug];

			const onOutComplete = (element: HTMLElement): void => {
				element.setAttribute('src', src);
				element.setAttribute('alt', alt);
			};

			const transition = new Transition(
				image,
				{
					initialStyle: outInitialStyle,
					finalStyle: outFinalStyle,
					transition: {
						duration: 500,
						timingFunc: 'ease-in',
					},
					callback: onOutComplete,
					optionsOfNext: {
						finalStyle: inFinalStyle,
						transition: {
							duration: 500,
							timingFunc: 'ease-out',
						},
						callback: onInComplete,
					},
				}
			);

			transition.do();
		});
	}

	protected transitionTitles(direction: AnimationDirection): void {
		const outFinalStyle: Partial<CSSStyleDeclaration> = {
			opacity: '0',
			transform: (direction === 'back') ? 'translateX(-10px)' : 'translateX(10px)',
		};

		const inInitialStyle: Partial<CSSStyleDeclaration> = {
			opacity: '0',
			transform: (direction === 'back') ? 'translateX(10px)' : 'translateX(-10px)',
		};

		const inFinalStyle: Partial<CSSStyleDeclaration> = {
			opacity: '1',
			transform: 'translateX(0)',
		};

		this.titlesData.forEach((data) => {
			const onOutComplete = (element: HTMLElement): void => {
				element.textContent = data.text;
			};

			const transition = new Transition(
				data.element,
				{
					finalStyle: outFinalStyle,
					transition: {
						duration: 300,
						timingFunc: 'ease-in',
					},
					callback: onOutComplete,
					optionsOfNext: {
						initialStyle: inInitialStyle,
						finalStyle: inFinalStyle,
						transition: {
							duration: 300,
							timingFunc: 'ease-out',
						},
					},
				}
			);
			transition.do();
		});
	}

}

export interface CarouselData {
	title: string;
	content: string | string[];
	imgSources: CarouselImageSet;
}

interface CarouselImageSet {
	[key: string]: CarouselImageData;
}

interface CarouselImageData {
	src: string;
	alt: string;
}

type AnimationDirection = 'back' | 'forward';
