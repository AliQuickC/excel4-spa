import { State, StatePropertyValue } from './types';

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

export function storage(key: string, data: State | null = null) { // читает/пишет в locale storage
	if (!data) { //                                // если параметр data не указан
		return JSON.parse(<string>localStorage.getItem(key)); // считываем значение 'excel-state'
	} //                                            // иначе если data есть
	localStorage.setItem(key, JSON.stringify(data)); // записываем data в local store
}

export function isEqual(a: StatePropertyValue, b: StatePropertyValue): boolean {
	if (typeof a === 'object' && typeof b === 'object') {
		return JSON.stringify(a) === JSON.stringify(b); // преобразуем объект к строке
	}
	return a === b;
}
