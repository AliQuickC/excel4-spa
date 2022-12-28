import {DomInstance} from './dom';
import {Emitter} from './Emitter';
import {ExcelComponent} from './ExcelComponent';

export type ReduxGetState = () => State;

export type ReduxDispatch = (action: Action) => void;

// export type ReduxSubscribe = ( fn: (args: Array<any>) => void ) => ReduxUnSubscribe;
export type ReduxSubscribe = ( fn: (state: State) => void ) => ReduxUnSubscribe;

export type ReduxUnSubscribe = {
	unsubscribe: ()=>void;
};

export type Store = {
	getState: ReduxGetState;
	dispatch: ReduxDispatch;
	subscribe: ReduxSubscribe;
}

// export type Store = {
// 	getState: () => State;
// 	dispatch: (action: Action) => void;
// 	subscribe: (fn: (...args: Array<any>) => void) => {unsubscribe: ()=>void};
// }

export type ActionData = {id: string, value: number};

export type ColState = {[id: string]: number};
export type State = {
	colState: ColState;
	// colState: {[key: string]: string};
};


export type Action = {
	type: ActionType
	data?: ActionData
}

export enum ActionType {
	Init = '__INIT__',
	TableResize = 'TABLE_RESIZE',
	ChangeText = 'CHANGE_TEXT',
	ApplyStyle = 'APPLY_STYLE',
	ChangeStyles = 'CHANGE_STYLES',
	ChangeTitle = 'CHANGE_TITLE',
	UpdateDate = 'UPDATE_DATE',
}

export type ExcelComponentOptions = {name?: string, listeners?: Array<string>, emitter: Emitter, store: Store};

export type ComponentClass = {
	new <T extends ExcelComponent>(element: DomInstance, options: ExcelComponentOptions): T,
	className: string,
};

type InstanceAddProp = {
	toHTML: () => string,
	init: () => void,
};
export type Instance = InstanceType<ComponentClass> & InstanceAddProp; // InstanceType - utility

export interface cellId {
	row: number,
	col: number
}

export type Events = 'table:select' | 'table:input' | 'formula:input' | 'formula:done';
export type EventHandler = ((text: string) => void) | (() => void) | (($cell: DomInstance) => void);

// type EventZeroParams = 'formula:done';
// type EventOneParams = 'table:select' | 'table:input' | 'formula:input';

// type SubscriberParams = DomInstance | string;
// export type VoidSubscriber = () => void;
// export type EventSubscriber = (param: SubscriberParams) => void;

// export type Handlers = {
// 	($cell: DomInstance): void;
// 	($cell: DomInstance): void;
// 	(text: string): void;
// 	(): void;
// };

// export type AddEvent = {
// 	(eventName: EventZeroParams, fn: VoidSubscriber): (eventName: Events, fn: VoidSubscriber)=>boolean;
// 	(eventName: EventOneParams, fn: EventSubscriber): (eventName: Events, fn: EventSubscriber)=>boolean;
// }
