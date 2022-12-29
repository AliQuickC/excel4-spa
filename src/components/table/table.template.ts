import { ColState, RowState, State } from '../../core/types';

const CODES = {
	A: 65,
	Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state: ColState, index: keyof State): string {
	return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state: RowState, index: keyof State): string {
	return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toCell(state: ColState, row: number) {
	return function (_: unknown, col: number) {
		const width = getWidth(state, col.toString() as keyof State); // ширина столбца + px
		return	`<div
							class="cell"
							contenteditable
							data-type="cell"
							data-id=${row}:${col}
							data-col="${col}"
							style="width: ${width}"
						></div>`;
	};
}

function toColumn({colChar, index, width}: {colChar: string, index: number, width: string}): string { // для каждого элемента массива(заголовка столбца) формируем верстку ячейки
	return `<div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
						${colChar}
						<div class="col-resize" data-resize="col"></div> <!--маркер для изсменения размера столбцов-->
					</div>`;
}

function createRow(rowCount: number | null, content: string, state: RowState) {
	const resizer = rowCount ? '<div class="row-resize" data-resize="row"></div>' : '';
	const height = rowCount === null ? 'auto' : getHeight(state, rowCount.toString() as keyof State);
	return `
	<div class="row" data-type="resizable" data-row="${rowCount}" style="height: ${height}">
		<div class="row-info">
			${rowCount ? rowCount : ''}
			${resizer} <!-- маркер для изменения размера строк-->
		</div>
		<div class="row-data">${content}</div>
	</div>
	`;
}

function widthWidthFrom(state: State) {
	return function(colChar: string, index: number): {colChar: string, index: number, width: string} {
		return {
			colChar, index, width: getWidth(state.colState, index.toString() as keyof State) // высчитывает значение ширины колонки
		};
	};
}

function toChar(_: string, index:number): string {
	return String.fromCharCode(CODES.A + index);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createTable(rowsCount = 15, state: State = {} as State): string { // вывод верстки таблици
	const colsCount = CODES.Z - CODES.A + 1; // количество столбцов в таблице
	const rows = [];

	// формируем ячейки для верхней строки, с буквами столбцов
	const cols = new Array(colsCount)
		.fill('') // массив пустых строк, для каждой ячейки
		.map(toChar) // преобразование кодов символов в символы, заполнение массива символами
		.map(widthWidthFrom(state)) // в map подставляется сформированая  ф-ция
		// после ф-ция, формирует объект(массив объектов) с параметрами, для отрисовки колонки
		.map(toColumn) // для каждого элемента массива(заголовка столбца) формируем верстку ячейки
		// для каждого элемента массива(заголовка столбца) формируем верстку ячейки
		.join('');	// склеиваем верстку всех ячеек в одну строку

	rows.push(createRow(null, cols, {}));

	for (let row=0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell(state.colState, row)) // для каждого элемента массива(ячейки) формируем верстку ячейки
			.join('');
		rows.push(createRow(row+1, cells, state.rowState));
	}

	// вывод верстки всей таблици
	return rows.join('');
}
