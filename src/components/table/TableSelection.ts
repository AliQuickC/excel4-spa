import {Dom} from '../../core/dom';

export class TableSelection {
	static className = 'selected';
	private group: Dom[];
	public current: Dom | null = null;

	constructor() {
		this.group = [] as Dom[];
	}

	select($el: Dom): void {
		this.clear();
		$el.focus().addClass(TableSelection.className);
		this.group.push($el);
		this.current = $el;
	}

	clear(): void {
		this.group.forEach(($cell)=>{ $cell.removeClass(TableSelection.className); });
		this.group = [];
	}

	selectGroup($group: Dom[] = []): void { // выделить группу ячеек
		this.clear();

		this.group = $group;
		this.group.forEach($el => $el.addClass(TableSelection.className));
	}
}
