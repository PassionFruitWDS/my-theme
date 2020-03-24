import Hook from '../misc/Hook';
import { FunctionBase } from '../misc/TypeDefs';
import generateEnumMap from '../misc/generateEnumMap';

/** Data store for a state. */
export default class StateData<
	Enum,
	F extends FunctionBase
> {

	/** Hook for callbacks to be fired on state entrance. */
	public readonly enterHook = new Hook<F>();

	/** Hook for callbacks to be fired on state exit. */
	public readonly exitHook = new Hook<F>();

	/** Cache of hook for callbacks to be fired on specific transitions. */
	private _transitionHooks: Partial<Record<keyof Enum, Hook<F>>> | undefined;

	/** Hook for callbacks to be fired on specific transitions. */
	public get transitionHooks(): Partial<Record<keyof Enum, Hook<F>>> {
		if (!this._transitionHooks) {
			const makeHook = (): Hook<F> => new Hook<F>();
			this._transitionHooks = generateEnumMap(this.stateList, makeHook);
		}

		return this._transitionHooks;
	}

	/**
	 * @param stateList List of states that can be transitioned to.
	 */
	constructor(private readonly stateList: (keyof Enum)[]) {
	}

}
