import Controllable from './Controllable';

/** base class for element controllers */
export default abstract class ControllerBase<T extends Controllable> {

	/**
	 * PROPERTIES
	 */

	/** map of elements registered with the controller */
	protected registeredElements: Map<symbol, T> = new Map<symbol, T>();

	/** Cache of the element currently targeted for control. */
	protected _current: T | undefined;

	/** Element currently targeted for control. */
	protected get current(): T {
		if (this._current) {
			return this._current;
		}

		throw Error('No element targeted for control');
	}

	/** cache for the form's initialization state */
	private _isInitialized = false;

	/** the form's initialization state */
	public get isInitialized(): boolean {
		return this._isInitialized;
	}

	/**
	 * METHODS
	 */

	/**
	 * Prepare the controller to implement element behavior
	 *
	 * @param args data and references the controller needs to implement element
	 * behavior
	 */
	public initialize(...args: any): void {
		if (this.isInitialized) {
			throw Error('Cannot initialize already initialized controller');
		} else {
			this.onInitialize(...args);
			this._isInitialized = true;
		}
	}

	/**
	 * Actions to take on controller initialization
	 *
	 * @param args data and references the controller needs to implement
	 * element behavior
	 */
	protected abstract onInitialize(...args: any): void;

	/**
	 * register a new element with the controller
	 *
	 * @param element
	 */
	public register(element: T): symbol {
		if (this.isInitialized) {
			const elementSym = element.symbol;

			if (!this.registeredElements.has(elementSym)) {
				this.registeredElements.set(elementSym, element);
				this._current = element;
				this.onRegister();
			}

			return elementSym;
		}
		throw Error('Cannot register elements before controller is initialized');

	}

	/**
	 * Actions to take on new element registration.
	 *
	 * @remark
	 * This typically involves hooking functions into the newly registered element
	 * to implement its intended behavior.
	 */
	protected abstract onRegister(): void;

	/**
	 * load a registered element given its unique identifying symbol
	 *
	 * @param key the unique symbol that identifies registered element to load
	 */
	protected loadByKey(key: symbol): void {
		this._current = this.registeredElements.get(key);
	}

}
