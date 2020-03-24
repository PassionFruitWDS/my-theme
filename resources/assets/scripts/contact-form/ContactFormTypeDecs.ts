import { StatefulBase } from '../util/state-modeling/StatefulBase';
import ContactForm from './ContactForm';

export enum ContactFormStates {
	idle = 'idle',
	active = 'active',
}

export type StatefulContactForm
	= ContactForm
	& StatefulBase<typeof ContactFormStates, () => void>
	& {
		statesData: {
			active:
			{
				subfieldIsActive: boolean[];
			};
			shared:
			{
				mainFieldIsActive: () => boolean;
			};
		};
	};

export type ContactFormHookCallback = () => void;
