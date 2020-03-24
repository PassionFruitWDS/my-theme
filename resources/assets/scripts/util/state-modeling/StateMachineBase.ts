import { FunctionBase } from '../misc/TypeDefs';
import { StatefulBase } from './StatefulBase';
import generateEnumMap from '../misc/generateEnumMap';
import StateProcessorBase from './StateProcessorBase';
import Processor from '../misc/Processor';

/** Base class for state machines. */
export default abstract class StateMachineBase<
	Enum,
	F extends FunctionBase,
	T,
	TT extends StatefulBase<Enum, F> & T
> extends Processor<T, TT, null> {

	/** State model for this machine. */
	protected abstract readonly stateProcessors: {
		[P in keyof Enum]: StateProcessorBase<
			Enum,
			F,
			P,
			T,
			TT
		>;
	};

	protected get currentProcessor(): StateProcessorBase<
		Enum,
		F,
		keyof Enum,
		T,
		TT
	> {
		return this.stateProcessors[this.current.state];
	}

	protected get currentStateData(): any {
		return this.current.statesData[this.current.state];
	}

	/**
	 * Create all StateData objects for this machine's state model.
	 *
	 * @returns State enum map to StateData objects.
	 */
	private createStatesData(obj: T): void {
		generateEnumMap(
			(Object.keys(this.stateProcessors) as (keyof Enum)[]),
			this.createStateData.bind(this),
			obj
		);
	}

	/**
	 * Create a new StateData object for some state.
	 *
	 * @param key State whose data object is to be created.
	 *
	 * @returns New StateData object for the given state.
	 */
	private createStateData(key: keyof Enum, obj: T): void {
		this.stateProcessors[key].extend(obj);
	}

	/** State in which all Stateful T objects begin. */
	protected abstract readonly initialState: keyof Enum;

	/**
	 * Extend an object with the Stateful interface.
	 *
	 * @param obj Object to be extended with the Stateful interface.
	 *
	 * @returns Input object extended with the Stateful interface.
	 */
	public extend(
		obj: T
	): TT {

		const stateful: T & Partial<TT> = obj;

		stateful.state = this.initialState;
		this.createStatesData(stateful);
		stateful.statesData.shared = this.makeSharedStateDataFor(obj);

		return (stateful as TT);
	}

	protected abstract makeSharedStateDataFor(obj: T): TT['statesData']['shared'];

	/**
	 * Handle an event on the Stateful object.
	 *
	 * @param args Arguments for hook callbacks.
	 */
	public process(
		...args: Parameters<F>
	): void {

		this.currentProcessor.load(this.current);
		this.currentProcessor.process();
		const newState = this.currentProcessor.result.resolvedTransition;

		if (newState) {
			this.transitionTo(newState, ...args);
		}
	}

	/**
	 * Transition the object to a new state, firing all appropriate hooks in the process.
	 *
	 * @param newState Target state for the transition.
	 * @param args Arguments of the hooked callbacks.
	 */
	private transitionTo(newState: keyof Enum, ...args: Parameters<F>): void {
		const { current } = this;
		const oldState = current.state;

		current.statesData[oldState].exitHook.execute(...args);
		current.statesData[oldState].transitionHooks[newState].execute(...args);
		current.state = newState;
		current.statesData[newState].enterHook.execute(...args);
	}

}
