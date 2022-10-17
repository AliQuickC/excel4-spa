
const CODES = {
	A: 65,
	Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(_: string, col:number) {
	return `<div class="cell" contenteditable data-col="${col}"></div>`;
}

function toColumn(col: string, index: number) {
	return `<div class="column" data-type="resizable" data-col="${index}">
						${col}
						<div class="col-resize" data-resize="col"></div> <!--маркер для изсменения размера столбцов-->
					</div>`;
}

function createRow(index: number | null, content: string) {
	const resizer = index ? "<div class=\"row-resize\" data-resize=\"row\"></div>" : "";
	return `
	<div class="row" data-type="resizable">
		<div class="row-info">
			${index ? index : ""}
			${resizer} <!-- маркер для изменения размера строк-->
		</div>
		<div class="row-data">${content}</div>
	</div>
	`;
}

function toChar(_: string, index:number): string {
	return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state = {}): string { // вывод верстки таблици
	const colsCount = CODES.Z - CODES.A + 1; // количество столбцов в таблице
	const rows = [];

	// формируем ячейки для верхней строки, с буквами столбцов
	const cols = new Array(colsCount)
		.fill("") // массив пустых строк, для каждой ячейки
		.map(toChar) // преобразование кодов символов в символы, заполнение массива символами
		// после ф-ция, формирует объект(массив объектов) с параметрами, для отрисовки колонки
		.map(toColumn) // для каждого элемента массива(заголовка столбца) формируем верстку ячейки
		.join("");	// склеиваем верстку всех ячеек в одну строку

	rows.push(createRow(null, cols));

	for (let i=0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill("")
			.map(toCell)
			.join("");
		rows.push(createRow(i+1, cells));
	}

	// вывод верстки всей таблици
	return rows.join("");
}