import {Dom} from './dom';
import {Emitter} from './Emitter';
import {ExcelComponent} from './ExcelComponent';

export type ExcelComponentOptions = {name?: string, listeners?: Array<string>, emitter: Emitter};

type baseClass = new <T extends ExcelComponent>(element: Dom, options: ExcelComponentOptions) => T;
type ClassAddProp = {className: string};
export type ComponentClass = baseClass & ClassAddProp;

type InstanceAddProp = {
	toHTML: () => string,
	init: () => void,
};
export type Instance = InstanceType<ComponentClass> & InstanceAddProp; // InstanceType - utility

export interface cellId {
	row: number,
	col: number
}

