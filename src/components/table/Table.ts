import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.template";
import {$, Dom} from "../../core/dom";
import {resizeHandler} from "./table.resize";
import {shouldResize} from "./table.functions";


export class Table extends ExcelComponent {
	static className = "excel__table";

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

	onMousedown(event: Event): void {
		if(shouldResize(event)) {
			resizeHandler(this.$root, event);
		}
	}

	onMousemove(event: Event): void {
		console.log("mousemove");
	}

	onMouseup(event: Event): void {
		console.log("mouseup");
	}
}