import {ComponentClass, Instance} from "../../core/types";
import {$, Dom} from "../../core/dom";

export class Excel {
	private $parentEl;
	private components: Array<ComponentClass> | Array<Instance> = [];

	constructor(selector: string, options: {components: Array<ComponentClass>}) { // !!!
		this.$parentEl = $(selector);
		this.components = options.components || [];
	}

	private getRoot(): Dom {
		const $root = $.create("div", "excel");

		this.components = this.components.map((Component) => {
			const $el: Dom = $.create("div", (<ComponentClass>Component).className); // корневой DOM для компонента
			const component: Instance = new (<ComponentClass>Component)($el);
			$el.html(component.toHTML());
			$root.append($el);
			return component;
		});

		return $root;
	}

	public render(): void {
		this.$parentEl.append(this.getRoot());
		this.components.forEach(component => (<Instance>component).init());
	}
}
