// import {ExcelComponent} from '../../core/ExcelComponent';
import { $, DomInstance } from '../../core/dom';
import {ExcelComponentOptions, State, ToolbarState} from '../../core/types';
import { createToolbar } from './toolbar.template';
import { ExcelStateComponent } from '../../core/ExcelStateComponent';
import { defaultStyles } from '../../constants';

export class Toolbar extends ExcelStateComponent {
	static className = 'excel__toolbar';

	constructor($root: DomInstance, options: ExcelComponentOptions) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
			subscribe: ['currentStyles'],		// подписка на изменение state
			...options
		});
	}

	public prepare() {
		this.initState(defaultStyles);		// инициализируем локальный state
	}

	get template(): string {						// формирует HTML код для вывода
		return createToolbar(this.state);	// отрисовка тулбара из локального state
	}

	public toHTML(): string {
		return this.template;
	}

	public storeChanged(changes: Partial<State>): void {
		this.setState(changes.currentStyles as ToolbarState);
	}

	protected onClick(event: Event): void {
		const $target = $(event.target as HTMLElement);
		if ($target.data.type === 'button') {				// если data-type === "button"
			const value: Partial<ToolbarState> = JSON.parse($target.data.value as string); // data-value хранит css свойство, за которое отвечает кнопка,
			//																				// считываем его, преобразуем в объект
			this.$emit('toolbar: applyStyle', value);	// сработка события, изменить стиль в таблице
		}
	}
}