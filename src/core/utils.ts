import { State, StatePropertyValue, Style } from './types';

// формирует имя события, делает верхний регистр для первой буквы
export function capitalize(string: string): string {
	if (typeof string !== 'string') {
		return '';
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start: number, end: number): number[] {
	if (start > end) {
		[end, start] = [start, end];
	}
	return new Array(end - start + 1)
		.fill('')
		.map((_: unknown, index: number) => start + index);
}

export function storage(key: string): State;												// читает из Locale Storage
export function storage(key: string, data: State): void;						// пишет в Locale Storage
export function storage(key: string, data: State | null = null): State | void { // читает/пишет Locale Storage
	if (!data) { 																											// если параметр data не указан
		return JSON.parse(<string>localStorage.getItem(key)); // считываем значение 'excel-state'
	}																												// иначе если data есть
	localStorage.setItem(key, JSON.stringify(data));				// записываем data(State) в local store
}

export function isEqual(a: StatePropertyValue, b: StatePropertyValue): boolean {
	if (typeof a === 'object' && typeof b === 'object') {
		return JSON.stringify(a) === JSON.stringify(b); // преобразуем объект к строке
	}
	return a === b;
}

// преобразует написание ключей объекта, из всех объектов(css свойств), формирует одну строку
export function toInlineStyles(styles: Style = {}): string {
	return Object.keys(styles) // список всех стилей какие есть, преобразуем в массив
		.map(key => `${camelToDasheCase(key)}: ${styles[key]}`) // camelToDasheCase - меняет стиль написания ключей объекта
		//					// формируем массив строк, из "css свойство" : "значение"
		.join(';'); // собираем массив в одну строку
}

export function camelToDasheCase(str: string): string {
	return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

type debounceCallback<T> = (args: T)=>void;
export function debounce<T>(fn: debounceCallback<T>, wait: number): (args: T)=>void {	// вызов fn не более одного раза в wait
	// блокирует вызов ф-ции fn, если появился новый вызов fn
	let timeout: NodeJS.Timeout; // в замыкании
	return function(args: T): void {
		const later = () => {
			clearTimeout(timeout);
			// fn.apply(this, [args]);
			fn(args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export function clone<T extends object>(obj: T): T { // клонируем объект
	return JSON.parse(JSON.stringify(obj));
}
