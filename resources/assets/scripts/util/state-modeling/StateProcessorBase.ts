import { FunctionBase } from '../misc/TypeDefs';
import { StatefulBase, StatefulShard, PartialStatefulShard } from './StatefulBase';
import Processor from '../misc/Processor';

/** Processor of state transition triggers for a single state. */
export default abstract class StateProcessorBase<
	Enum,
	F extends FunctionBase,
	P extends keyof Enum,
	T,
	TT extends StatefulBase<Enum, F> & T
> extends Processor<
	T,
	StatefulShard<Enum, F, P, T, TT>,
	{ resolvedTransition: keyof Enum | null }
> {

	protected get currentStateData(): TT['statesData'][P] {
		return (this.current.statesData[this.state] as TT['statesData'][P]);
	}

	protected get currentSharedData(): TT['statesData']['shared'] {
		return (this.current.statesData.shared as TT['statesData']['shared']);
	}

	constructor(public readonly state: P) {
		super();
	}

	/** State, if any, that the processing target should transition to. */
	protected abstract get resolvedTransition(): null | keyof Enum;

	/**
	 * Generate the data needed for this state's function.
	 *
	 * @returns New data object.
	 */
	public extend(obj: T): StatefulShard<Enum, F, P, T, TT> {

		type ReturnT = StatefulShard<Enum, F, P, T, TT>;
		type PReturnT = PartialStatefulShard<
			Enum,
			F,
			P,
			T,
			TT
		>;

		const extending: PReturnT = obj;
		if (!extending.statesData) {
			extending.statesData = {
				[this.state]: this.makeNewDataFor(obj),
			} as { [PP in P]: TT['statesData'][P] };
		} else {
			extending.statesData[this.state] = this.makeNewDataFor(obj);
		}

		const extended: ReturnT = (extending as ReturnT);

		return extended;

	}

	protected abstract makeNewDataFor(obj: T): TT['statesData'][P];

	/** List of states accessible from this state. */
	public readonly abstract canSendTo: (keyof Enum)[];

}
