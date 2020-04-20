import { FunctionBase } from '../misc/TypeDefs';
import StateData from './StateData';

/** Store for the object's current state & all the object's state data. */
export interface StatefulBase<
	Enum,
	F extends FunctionBase
> {
	state: keyof Enum;
	statesData: StateDataRecordBase<Enum, F> & {
		shared: any;
	};
}

export type StatefulShard<
	Enum,
	F extends FunctionBase,
	P extends keyof Enum,
	T,
	TT extends T & StatefulBase<Enum, F>
> = T & {
	state: keyof Enum;
	statesData:
		{ shared: TT['statesData']['shared'] }
		&
		{ [PP in P]: TT['statesData'][PP] };
};

export type PartialStatefulShard<
	Enum,
	F extends FunctionBase,
	P extends keyof Enum,
	T,
	TT extends T & StatefulBase<Enum, F>
> = T & {
	state?: keyof Enum;
	statesData?:
		{ [PP in P]: Partial<TT['statesData'][PP]> };
};

/** Store for the data related to specific states. Includes callbacks. */
export type StateDataRecordBase<
	Enum,
	F extends FunctionBase
> = Record<keyof Enum, StateData<Enum, F>>;
