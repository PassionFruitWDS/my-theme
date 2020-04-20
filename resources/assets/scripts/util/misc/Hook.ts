import { FunctionBase } from './TypeDefs';

/** Extended Array type for callback functions. */
export default class Hook<F extends FunctionBase> {

	/** Array of callback functions. */
	private callbacks: Array<F> = new Array<F>();

	/**
	 * Add a new callback to the hook.
	 *
	 * @param func Callback function to be registered.
	 */
	public set(func: F): void {
		this.callbacks.push(func);
	}

	/**
	 * Execute all callbacks registered with the hook.
	 *
	 * @param args Arguments to be given to all callbacks.
	 */
	public execute(...args: Parameters<F>): void {
		this.callbacks.forEach((callback) => callback(...args));
	}

	/**
	 * Remove a new callback from the hook.
	 *
	 * @param callback The callback that will be removed.
	 *
	 * @remark Callbacks produced using .bind(...) will only be matched with the return value from .bind(...). It is good practice to always save the return from .bind(...) for such use cases.
	 */
	public unset(callback: F): void {
		const index = this.callbacks.indexOf(callback);
		if (index >= 0) {
			this.callbacks.splice(index, 1);
		}
	}

}
