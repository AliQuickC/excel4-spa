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
		// 	const $resizer = $(event.target as HTMLElement);
		// 	const $parent = $resizer.closest("[data-type=\"resizable\"]");
		// 	const coords = $parent.getCoords();
		// 	const resizerType = $resizer.data.resize;
		// 	const sideProp = resizerType === "col" ? "bottom" : "right";
		// 	let value: number;
		//
		// 	$resizer.css({opacity: "1", [sideProp]: "-5000px"});
		//
		// 	document.onmousemove = e => {
		// 		if(resizerType === "col") {
		// 			const delta = e.pageX - coords.right;
		// 			value = coords.width + delta;
		// 			$resizer.css({right: -delta + "px"});
		//
		// 		} else {
		// 			const delta = e.pageY - coords.bottom;
		// 			value = coords.height + delta;
		// 			$resizer.css({bottom: -delta + "px"});
		// 		}
		// 	};
		//
		// 	document.onmouseup = e => {
		// 		document.onmousemove = null;
		// 		document.onmouseup = null;
		// 		if(resizerType === "col") {
		// 			$parent.css({width: value + "px"});
		// 			this.$root.findAll(`[data-col="${$parent.data.col}"]`)
		// 				.forEach((el: Node): string => (<HTMLDivElement>el).style.width = value + "px" );
		// 		} else {
		// 			$parent.css({height: value + "px"});
		// 		}
		// 		$resizer.css({opacity: "0", bottom: "0", right: "0"});
		// 	};
		// }

	}

	onMousemove(event: Event): void {
		console.log("mousemove");
	}

	onMouseup(event: Event): void {
		console.log("mouseup");
	}
}