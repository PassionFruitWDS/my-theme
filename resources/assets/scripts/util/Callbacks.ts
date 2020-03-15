type GenFunction = (...args: any[]) => any;

/** Extended Array type for callback functions. */
export default class Callbacks<T extends GenFunction> extends Array<T> {

	/** Execute all callbacks in the array. */
	public execute(...args: Parameters<T>): void {
		this.forEach((callback) => callback(...args));
	}

	/**
	 * Remove a specific callback from the array.
	 *
	 * @param callback The callback that will be removed.
	 *
	 * @remark Callbacks produced using .bind(...) will only be matched with the return value from .bind(...). It is good practice to always save the return from .bind(...) for such use cases.
	 */
	public remove(callback: T): void {
		const index = this.indexOf(callback);
		if (index >= 0) {
			this.splice(index, 1);
		}
	}

}
