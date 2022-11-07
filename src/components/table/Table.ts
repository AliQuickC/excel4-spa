import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.template";
import {$, Dom} from "../../core/dom";
import {resizeHandler} from "./table.resize";
import {isCell, matrix, shouldResize} from "./table.functions";
import {TableSelection} from "./TableSelection";

export class Table extends ExcelComponent {
	static className = "excel__table";
	// private selection: InstanceType<typeof TableSelection> | undefined;
	private selection: TableSelection | undefined;

	constructor($root: Dom) {
		super($root, {
			name: "Table",
			listeners: ["mousedown"]
			// listeners: ["mousedown", "mousemove", "mouseup"]
		});
	}

	toHTML(): string {
		return createTable(20);
	}

	prepare(): void { // запускается в конструкторе родительского класса
		this.selection = new TableSelection(); // объект реализует логику выделения ячейки/ячеек
	}

	init() {
		super.init();
		const $cell = this.$root.find("[data-id=\"0:0\"]");
		(<TableSelection>this.selection).select($cell);
	}

	onMousedown(event: MouseEvent): void {
		if (shouldResize(event)) { // если событие произошло на маркере ресайза, и у элемента есть дата атрибут data-resize
			resizeHandler(this.$root, event); // обработка ресайза таблици
		} else if (isCell(event)) { // если событие произошло на ячейке
			const $target: Dom = $(<HTMLElement>event.target);

			if (event.shiftKey) { // событие на ячейке, с зажатым shift, групповое выделение ячеек
				const $cells = matrix($target, ((<TableSelection>this.selection).current) as Dom) // массив строк, список всех выбранных ячеек
					.map(id => this.$root.find(`[data-id="${id}"]`)); // массив элементов(ячеек) со страници,
					//																								// которые были выделены
				(<TableSelection>this.selection).selectGroup($cells); // выделение гуппы ячеек
			} else {
				(<TableSelection>this.selection).select($target);
			}
		}
	}

	onMousemove(event: Event): void {
		console.log("mousemove");
	}

	onMouseup(event: Event): void {
		console.log("mouseup");
	}
}