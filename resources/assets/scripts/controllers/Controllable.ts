type GenFunction = (...args: any[]) => any;
type SymbolFunction<T extends GenFunction>
	= (sym: symbol, ...args: Parameters<T>) => ReturnType<T>;

/** Base class for controllable objects within the current framework. */
export default abstract class Controllable {

	/** Store of the object's unique identifying symbol. */
	private _symbol: symbol;

	/** Object's unique identifying symbol. */
	public get symbol(): symbol {
		return this._symbol;
	}

	/**
	 * Execute a callback with this object's identifying symbol as the first argument.
	 *
	 * @param func Callback to execute.
	 * @param args Additional arguments for the callback.
	 * @returns Output of the callback.
	 */
	private passThroughSymbol<T extends GenFunction>(
		func: SymbolFunction<T>,
		...args: Parameters<T>
	): ReturnType<T> {
		return func(this.symbol, ...args);
	}

	/**
	 * Wrap a callback to provide it this object's symbol on execution.
	 *
	 * @param func Callback that accepts this object's symbol as its first argument.
	 * @return Wrapped callback reference.
	 */
	public notify<T extends GenFunction>(func: SymbolFunction<T>): T {
		const boundPassThrough = this.passThroughSymbol.bind(this);
		function execute(...args: Parameters<T>): ReturnType<T> {
			return boundPassThrough(func, ...args);
		}

		return (execute as T);
	}

	constructor() {
		this._symbol = Symbol();
	}

}
