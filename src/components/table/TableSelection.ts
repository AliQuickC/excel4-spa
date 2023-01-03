import {DomInstance} from '../../core/dom';
import { Style } from '../../core/types';

export class TableSelection {
	static className = 'selected';
	private group: DomInstance[];
	public current!: DomInstance;

	constructor() {
		this.group = [] as DomInstance[];
	}

	select($el: DomInstance): void {
		this.clear();
		$el.focus().addClass(TableSelection.className);
		this.group.push($el);
		this.current = $el;
	}

	clear(): void {
		this.group.forEach(($cell)=>{ $cell.removeClass(TableSelection.className); });
		this.group = [];
	}

	get selectedIds(): string[] { // возвращает массив c id, выделенных ячеек
		return this.group.map($el => $el.id());
	}

	selectGroup($group: DomInstance[] = []): void { // выделить группу ячеек
		this.clear();

		this.group = $group;
		this.group.forEach($el => $el.addClass(TableSelection.className));
	}

	applyStyle(style: Style) { // применяет стили из объекта style, для выделенных ячееек this.group
		this.group.forEach($el => $el.css(style));
	}
}
