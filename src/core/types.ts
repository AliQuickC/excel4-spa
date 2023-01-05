import {DomInstance} from './dom';
import {Emitter} from './Emitter';
import {ExcelComponent} from './ExcelComponent';

export type Style = {[key: string]: string}

export type ReduxGetState = () => State;
export type ReduxDispatch = (action: Action) => void;
export type ReduxSubscribe = ( fn: (state: State) => void ) => ReduxUnSubscribe;
export type ReduxUnSubscribe = {
	unsubscribe: ()=>void;
};

export type Store = {
	getState: ReduxGetState;
	dispatch: ReduxDispatch;
	subscribe: ReduxSubscribe;
}

export type ActionData = ActionDataResize | ActionDataChangeText | ActionDataCellsData | ActionDataApplyStyle | string;
export type ActionDataResize = {resizerType: string, id: string, value: number};
export type ActionDataChangeText = {id: string, value: string};
export type ActionDataCellsData = {[key: string]: string};
export type ActionDataApplyStyle = {value: Partial<ToolbarState>, ids: string[]};


export type ColsOrRowState = {[id: string]: number};
export type ApplyStyle = {[key: string]: ToolbarState}
export type State = {
	title: string,
	colState: ColsOrRowState;
	rowState: ColsOrRowState;
	cellsDataState: ActionDataCellsData,
	stylesState: ApplyStyle,
	currentText: string,
	currentStyles: ToolbarState,
	openedDate: string,
};
export type ReducerData = ColsOrRowState | ActionDataCellsData | ApplyStyle;
export type StatePropertyValue = ColsOrRowState | ColsOrRowState | ActionDataCellsData | string | ApplyStyle;

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

export type ExcelComponentOptions = {name?: string, listeners?: Array<string>, subscribe?: Array<string>, emitter: Emitter, store: Store};

export type ComponentClass = {
	new <T extends ExcelComponent>(element: DomInstance, options: ExcelComponentOptions): T,
	className: string,
};

export type Constructable<T> = {
	new (params: string): T;
}

type InstanceAddProp = {
	toHTML: () => string,
	init: () => void,
};
export type Instance = InstanceType<ComponentClass> & InstanceAddProp;

export interface cellId {
	row: number,
	col: number
}

export type Events = 'table:select' | 'table:input' | 'formula:input' | 'formula:done' | 'toolbar: applyStyle';
export type EventHandler = ((text: string) => void) | (() => void) | (($cell: DomInstance) => void) | ((value: Partial<ToolbarState>) => void);

export type ButtonConfig = {
	icon: string;
	active: boolean;
	value: Partial<ToolbarState>;
};

export type ToolbarState = {
	textAlign: 'left' | 'center' | 'right',
	fontWeight: 'normal' | 'bold',
	fontStyle: 'normal' | 'italic',
	textDecoration: 'none' | 'underline'
};

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
