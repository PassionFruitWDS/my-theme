export type FunctionBase = (...args: any[]) => any;
export type SymbolFunction<T extends FunctionBase>
	= (sym: symbol, ...args: Parameters<T>) => ReturnType<T>;
