import FormField from './FormField';
import { StatefulBase } from '../util/state-modeling/StatefulBase';

export enum FormFieldStates {
	idle = 'idle',
	active = 'active',
}

export type StatefulFormField = FormField
	& StatefulBase<typeof FormFieldStates, () => void>
	& {
		shared: null;
	};

export type FormFieldHookCallback = () => void;
