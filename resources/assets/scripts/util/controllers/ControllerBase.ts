import Controllable from './Controllable';
import Hook from '../misc/Hook';

/** Base class for object controllers. */
export default abstract class ControllerBase<
	T extends Controllable,
	TT extends T,
> {

	/**
	 * PROPERTIES
	 */

	/** Map of objects registered with the controller. */
	protected objs: Map<symbol, TT> = new Map<symbol, TT>();

	/** Cache of the object currently targeted for control. */
	private _current: TT | undefined;

	/** Object currently targeted for control. */
	public get current(): TT {
		if (this._current) {
			return this._current;
		}

		throw Error('No object targeted for control.');
	}

	/** Cache for the form's initialization status. */
	private _isInitialized = false;

	/** Form's initialization status. */
	public get isInitialized(): boolean {
		return this._isInitialized;
	}

	/** Registration event hook. */
	private registrationHook: Hook<(programmedObj: TT) => void> = new Hook();

	/**
	 * METHODS
	 */

	/**
	 * Add a callback to be fired on registration of a new controllable object.
	 *
	 * @param callback Callback to add to the hook. Callback may accept the controllers programmed object type as an argument.
	 */
	public addRegistrationListener(
		callback: (programmedObject: TT) => void,
	): void {
		this.registrationHook.set(callback);
	}

	/**
	 * Remove a callback from the registration hook.
	 *
	 * @param callback Callback to be removed from the hook.
	 */
	public removeRegistrationListener(
		callback: (programmedObject: TT) => void,
	): void {
		this.registrationHook.unset(callback);
	}

	/**
	 * Prepare the controller to implement object behavior.
	 *
	 * @param _args Data and references the controller needs to implement object behavior.
	 * @remark It is the responsibility of subclasses to define a controller's initialized state.
	 */
	protected initialize(..._args: any[]): void {
		if (this.isInitialized) {
			throw Error('Attempted to initialize controller more than once.');
		}

		this._isInitialized = true;
	}

	/**
	 * Register a new object for control by extending it with functionality needed by the controller.
	 *
	 * @param obj Object to be registered.
	 * @returns Registered object with extended functionality.
	 */
	public register(obj: T): TT {
		if (this.isInitialized) {
			const { id } = obj;

			if (!this.objs.has(id)) {
				const programedObj = this.program(obj);
				this.registrationHook.execute(programedObj);
				this.objs.set(id, programedObj);
			}

			return this.objs.get(id);
		}
		throw Error('Attempted to register object before controller initialization.');
	}

	/**
	 * Program an object to behave in the way intended by the controller.
	 *
	 * @param obj Object to be programmed for desired behavior.
	 * @returns object extended with control programming.
	 */
	protected abstract program(obj: T): TT;

	/**
	 * Load a controlled object given its unique identifying symbol.
	 *
	 * @param key Unique symbol that identifies the controlled object to load.
	 * @returns Load operation success indicator.
	 */
	public load(key: symbol): boolean {
		let status = false;

		if (this.objs.has(key)) {
			this._current = this.objs.get(key);
			status = true;
		}

		return status;
	}

}
