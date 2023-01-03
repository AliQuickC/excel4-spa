import {DomInstance} from '../../core/dom';
import {cellId} from '../../core/types';
import {range} from '../../core/utils';

export function shouldResize(event: Event) {
	return (<HTMLElement>event.target).dataset.resize; // дата атрибут data-resize
}

export function isCell(event: Event): boolean {
	return (<HTMLElement>event.target).dataset.type === 'cell';
}

export function matrix($target: DomInstance, $current: DomInstance): string[] {
	const target = $target.id(true) as cellId;		// объект с координатами ячейки, выбранной нажатием
	const current = $current.id(true) as cellId;	// объект с координатами ячейки, которая уже была выбрана

	const cols: number[] = range(current.col, target.col);	// массив номеров, диапазон выбранных колонок
	const rows: number[] = range(current.row, target.row);	// массив номеров, диапазон выбранных строк

	return rows.reduce((acc, row) => {	// возвращает массив строк, список всех выбранных ячеек
		cols.forEach(col => acc.push(`${row}:${col}`));
		return acc;
	}, [] as string[]);
}

export function nextSelector(key: string, {col, row}: cellId) {	// определяет ячейку для перемещения после нажатия
	const MIN_VALUE = 0;
	switch (key) {
	case 'Enter':
	case 'ArrowDown':
		row++;
		break;
	case 'Tab':
	case 'ArrowRight':
		col++;
		break;
	case 'ArrowLeft':
		col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
		break;
	case 'ArrowUp':
		row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
		break;
	}

	return `[data-id="${row}:${col}"]`;
}
