import Controllable from './Controllable';

/** base class for element controllers */
export default abstract class ControllerBase<
	T extends Controllable,
	TT extends T,
> {

	/**
	 * PROPERTIES
	 */

	/** Map of elements registered with the controller. */
	protected elements: Map<symbol, TT> = new Map<symbol, TT>();

	/** Cache of the element currently targeted for control. */
	private _current: TT | undefined;

	/** Element currently targeted for control. */
	public get current(): TT {
		if (this._current) {
			return this._current;
		}

		throw Error('No element targeted for control');
	}

	/** Cache for the form's initialization status. */
	private _isInitialized = false;

	/** Form's initialization status. */
	public get isInitialized(): boolean {
		return this._isInitialized;
	}

	/**
	 * METHODS
	 */

	/**
	 * Prepare the controller to implement element behavior.
	 *
	 * @param args Data and references the controller needs to implement element behavior.
	 * @remark It is the responsibility of subclasses to define a controller's initialized state.
	 */
	public initialize(..._args: any[]): void {
		if (this.isInitialized) {
			throw Error('Cannot initialize already initialized controller');
		}

		this._isInitialized = true;
	}

	/**
	 * Register a new element for control.
	 *
	 * @param element Element to be registered.
	 */
	public register(element: T): symbol {
		if (this.isInitialized) {
			const { id: symbol } = element;

			if (!this.elements.has(symbol)) {
				const programedElement = this.program(element);
				this.elements.set(symbol, programedElement);
			}

			this._current = this.elements.get(symbol);
			return symbol;
		}
		throw Error('Cannot register elements before controller is initialized');
	}

	/**
	 * Program an element to behave in the way intended by the controller.
	 *
	 * @param element Element to be programmed for desired behavior.
	 * @returns Element extended with control programming.
	 */
	protected abstract program(element: T): TT;

	/**
	 * Load a controlled element given its unique identifying symbol.
	 *
	 * @param key Unique symbol that identifies the controlled element to load.
	 * @returns Load operation success indicator.
	 */
	public load(key: symbol): boolean {
		let status = false;

		if (this.elements.has(key)) {
			this._current = this.elements.get(key);
			status = true;
		}

		return status;
	}

}
