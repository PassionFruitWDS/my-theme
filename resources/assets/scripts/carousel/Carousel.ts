import Controllable from '../util/controllers/Controllable';

export class Carousel extends Controllable {

	protected images: Map<string, JQuery<HTMLElement>> =
	new Map<string, JQuery<HTMLElement>>();

	private _title: JQuery<HTMLElement>;

	private _nextTitle: JQuery<HTMLElement>;

	private _prevTitle: JQuery<HTMLElement>;

	private _content: JQuery<HTMLElement>;

	protected setNextListener(): void {
		this.nextTitle.on('click', this.renderNext);
	}

	protected setPrevListener(): void {
		this.prevTitle.on('click', this.renderPrev);
	}

	protected setFrwdListener(): void {
		this.element.find(`#${this.htmlId}__frwd`).on('click', this.renderNext);
	}

	protected renderNext(): void {
		this.index += 1;
	}

	protected setBackListener(): void {
		this.element.find(`#${this.htmlId}__back`).on('click', this.renderPrev);
	}

	protected renderPrev(): void {
		this.index -= 1;
	}

	private _htmlId: string;

	private _index: number;

	public get htmlId(): string {
		if (!this._htmlId) {
			this._htmlId = this.element.attr('id');

			if (!this._htmlId) {
				throw Error('Tri-content element lacks an html id.');
			}
		}

		return this._htmlId;
	}

	protected getDataByIndex(index: number): CarouselData {
		const modIndex = index % this.data.length;
		if (modIndex < 0) {
			return this.data[modIndex + this.data.length];
		}

		return this.data[index % this.data.length];
	}

	protected get prevData(): CarouselData {
		return this.getDataByIndex(this.index - 1);
	}

	protected get nextData(): CarouselData {
		return this.getDataByIndex(this.index + 1);
	}

	protected get currData(): CarouselData {
		return this.getDataByIndex(this.index);
	}

	protected render(): void {
		this.prevTitle.html(this.prevData.title);
		this.nextTitle.html(this.nextData.title);
		this.title.html(this.currData.title);
		this.renderImages(this.currData.imgSources);
		this.content.html(this.currData.content);
	}

	private get content(): JQuery<HTMLElement> {
		if (!this._content) {
			this._content = this.element.find(`#${this.htmlId}__content`);
		}

		return this._content;
	}

	protected renderImages(imgSources: CarouselImageSources): void {
		const keys = Object.keys(imgSources);

		keys.forEach((key) => { this.renderImage(imgSources[key], key); });
	}

	protected renderImage(source: string, idSlug: string): void {
		if (!this.images.has(idSlug)) {
			this.images.set(
				idSlug,
				this.element.find(`#${this.htmlId}__icon--${idSlug}`)
			);
		}

		this.images.get(idSlug).attr('src', source);
	}

	private get title(): JQuery<HTMLElement> {
		if (!this._title) {
			this._title = this.element.find(`#${this.htmlId}__current`);
		}

		return this._title;
	}

	protected get nextTitle(): JQuery<HTMLElement> {
		if (!this._nextTitle) {
			this._nextTitle = this.element.find(`#${this.htmlId}__next`);
		}

		return this._nextTitle;
	}

	protected get prevTitle(): JQuery<HTMLElement> {
		if (!this._prevTitle) {
			this._prevTitle = this.element.find(`#${this.htmlId}__prev`);
		}

		return this._prevTitle;
	}

	protected set index(index: number) {
		this._index = index % this.data.length;

		this.render();
	}

	protected get index(): number {
		return this._index;
	}

	constructor(
		public readonly element: JQuery<HTMLElement>,
		protected readonly data: CarouselData[]
	) {
		super();

		// Bind callbacks
		this.renderNext = this.renderNext.bind(this);
		this.renderPrev = this.renderPrev.bind(this);

		// Set listeners and callbacks
		this.setBackListener();
		this.setFrwdListener();
		this.setPrevListener();
		this.setNextListener();

		// Render initial data
		this.index = 0;
	}


}

export interface CarouselData {
	title: string;
	content: string;
	imgSources: CarouselImageSources;
}

interface CarouselImageSources {
	one: string;
	two: string;
	three: string;
}
