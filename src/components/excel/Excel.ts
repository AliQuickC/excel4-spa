// import {ExcelComponentClass} from "../../core/types";
import {ExcelComponent} from "../../core/ExcelComponent";
import {$, Dom} from "../../core/dom";

export class Excel {
// export class Excel<AppClass extends AppComponent> {
	private $parentEl;
	private components;

	// constructor(selector: string, options: {components: Array<new (element: HTMLElement) => A> }) {
	constructor(selector: string, options: {components: Array<any> }) { // !!!
		this.$parentEl = $(selector);
		this.components = options.components || [];
	}

	private getRoot(): Dom {
		const $root = $.create("div", "excel");

		this.components = this.components.map((Component) => {
			const $el: Dom = $.create("div", Component.className); // вынести внутрь компонента
			const component = new Component($el);
			$el.html(component.toHTML());
			$root.append($el);
			return component;
		});

		return $root;
	}

	public render(): void {
		this.$parentEl.append(this.getRoot());
		this.components.forEach(component => component.init());
		// this.components.forEach(component => component.destroy());
	}
}
