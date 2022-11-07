import {Dom} from "../../core/dom";
import {cellId} from "../../core/types";
import {range} from "../../core/utils";

export function shouldResize(event: Event) {
	return (<HTMLElement>event.target).dataset.resize; // дата атрибут data-resize
}

export function isCell(event: Event): boolean {
	return (<HTMLElement>event.target).dataset.type === "cell";
}

export function matrix($target: Dom, $current: Dom): string[] {
	const target = $target.id(true) as cellId; // объект с координатами ячейки, выбранной нажатием
	const current = $current.id(true) as cellId; // объект с координатами ячейки, которая уже была выбрана

	const cols: number[] = range(current.col, target.col); // массив номеров, диапазон выбранных колонок
	const rows: number[] = range(current.row, target.row); // массив номеров, диапазон выбранных строк

	return rows.reduce((acc, row) => { // возвращает массив строк, список всех выбранных ячеек
		cols.forEach(col => acc.push(`${row}:${col}`));
		return acc;
	}, [] as string[]);
}
