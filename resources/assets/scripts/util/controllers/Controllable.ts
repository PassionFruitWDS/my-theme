import { FunctionBase, SymbolFunction } from '../misc/TypeDefs';

/** Base class for controllable objects within the current framework. */
export default abstract class Controllable {

	/** Store of the object's unique identifying symbol. */
	private _id: symbol;

	/** Object's unique identifying symbol. */
	public get id(): symbol {
		return this._id;
	}

	/**
	 * Execute a callback with this object's identifying symbol as the first argument.
	 *
	 * @param func Callback to execute.
	 * @param args Additional arguments for the callback.
	 * @returns Output of the callback.
	 */
	private passThroughSymbol<T extends FunctionBase>(
		func: SymbolFunction<T>,
		...args: Parameters<T>
	): ReturnType<T> {
		return func(this.id, ...args);
	}

	/**
	 * Wrap a callback to provide it this object's symbol on execution.
	 *
	 * @param func Callback that accepts this object's symbol as its first argument.
	 * @return Wrapped callback reference.
	 */
	public notify<T extends FunctionBase>(func: SymbolFunction<T>): T {
		const boundPassThrough = this.passThroughSymbol.bind(this);
		const wrapper = (
			...args: Parameters<T>
		): ReturnType<T> => boundPassThrough(func, ...args);

		return (wrapper as T);
	}

	protected constructor(symbolStr = '') {
		this._id = Symbol(symbolStr);
	}

}
