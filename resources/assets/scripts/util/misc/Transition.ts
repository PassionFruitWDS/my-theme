function makeTransitionValue(
	style: Partial<CSSStyleDeclaration>,
	{
		duration = 0,
		timingFunc = 'linear',
		delay = 0,
	}
): string {

	const props = Object.keys(style);

	const value = props.reduce(
		(returnValue, prop): string => {
			const kebabProp = prop.replace(
				/[A-Z]/g,
				(char) => `-${char.toLocaleLowerCase()}`
			);
			return `${returnValue} ${kebabProp} ${duration}ms ${timingFunc} ${delay}ms,`;
		},
		''
	);

	return value.slice(0, -1);
}

export default class Transition {

	private readonly finalStyle: Partial<CSSStyleDeclaration>;

	private readonly transition: {
		duration: number;
		timingFunc?: string;
		delay?: number;
	};

	private readonly initialStyle: Partial<CSSStyleDeclaration> | undefined;

	private readonly callback: ((element: HTMLElement) => void) | undefined;

	private readonly next: Transition | undefined;

	constructor(
		private readonly target: HTMLElement,
		options: TransitionOptions,
	) {
		this.finalStyle = options.finalStyle;
		this.initialStyle = options.initialStyle;
		this.transition = options.transition;
		this.callback = options.callback;

		if (options.optionsOfNext) {
			this.next = new Transition(target, options.optionsOfNext);
		}

		this.start = this.start.bind(this);
		this.finish = this.finish.bind(this);
	}

	public do(): void {
		if (this.initialStyle) {
			this.target.style.transition = makeTransitionValue(
				this.initialStyle,
				{}
			);
			Object.assign(this.target.style, this.initialStyle);
			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(this.start);
			});
		} else {
			this.start();
		}
	}

	private start(): void {
		this.target.style.transition = makeTransitionValue(
			this.finalStyle,
			this.transition,
		);
		Object.assign(this.target.style, this.finalStyle);
		this.wait();
	}

	private async wait(): Promise<void> {
		await new Promise<void>((r) => setTimeout(r, this.transition.duration));
		this.finish();
	}

	private finish(): void {
		if (this.callback) {
			this.callback(this.target);
		}

		if (this.next) {
			this.next.do();
		}
	}

}

interface TransitionOptions {
	finalStyle: Partial<CSSStyleDeclaration>;
	transition: {
		duration: number;
		timingFunc?: string;
		delay?: number;
	};
	initialStyle?: Partial<CSSStyleDeclaration>;
	callback?: (element: HTMLElement) => void;
	optionsOfNext?: TransitionOptions;
}

type NotCSSProperty = number | 'parentRule' | 'length' | 'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty';
