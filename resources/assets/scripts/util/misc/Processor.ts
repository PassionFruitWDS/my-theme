export default abstract class Processor<T, TT extends T, R> {

	/** Store of the object being processed. */
	private _current: TT;

	/** Store of the results, if any, of processing the current target. */
	protected _result: R | undefined;

	/** Object being processed. */
	public get current(): TT {
		if (this._current) {
			return this._current;
		}

		throw Error('No data loaded.');
	}

	/**
	 * Load a processing target into the processor.
	 *
	 * @param obj Processing target to load.
	 */
	public load(obj: TT): void {
		this._current = obj;
	}

	/** Extend an object with data required by the processor. */
	public abstract extend(obj: T): TT;

	/** Execute the processing logic for the currently loaded target. */
	public abstract process(): void;

	/** Results, if any, of processing the current target. */
	public get result(): R | undefined {
		return this._result;
	}

}
