import {DomInstance} from './dom';
import {Emitter} from './Emitter';
import {ExcelComponent} from './ExcelComponent';

export type ExcelComponentOptions = {name?: string, listeners?: Array<string>, emitter: Emitter,};

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
