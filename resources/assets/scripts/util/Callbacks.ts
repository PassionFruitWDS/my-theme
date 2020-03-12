/** Extended Array type for callback functions */
export class Callbacks extends Array<() => void> {
	constructor(...args: any) {
		super(...args);
	}

	/** Execute all callbacks in the array */
	public execute(): void {
		this.forEach(callback => callback());
	}

	/**
	 * Remove a specific callback from the array
	 *
	 * @param callback The callback that will be removed.
	 *
	 * @remark Note that callbacks added using .bind(...) will only be matched
	 * with the return value from .bind(...). It is good practice to always save
	 * the return from .bind(...) for such use cases.
	 */
	public remove(callback: () => void): void {
		const index = this.indexOf(callback);
		if (index >= 0) {
			this.splice(index, 1);
		}
	}
}
