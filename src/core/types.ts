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
