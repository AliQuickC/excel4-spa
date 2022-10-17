import {Dom} from "./dom";

export type ExcelComponentOptions = {name: string, listeners: Array<string>};

type baseClass = new <T>(element: Dom) => T;
type ClassAddProp = {className: string};
export type ComponentClass = baseClass & ClassAddProp;
type InstanceAddProp = {
	toHTML: () => string,
	init: () => void,
};
export type Instance = InstanceType<ComponentClass> & InstanceAddProp;




