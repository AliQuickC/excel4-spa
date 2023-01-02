import { DomInstance } from './dom';
import {ExcelComponent} from './ExcelComponent';
import { ExcelComponentOptions, ToolbarState } from './types';

export abstract class ExcelStateComponent extends ExcelComponent {
	public state!: ToolbarState;

	constructor(...args: [$root: DomInstance, options: ExcelComponentOptions]) {
		super(...args);
	}

	abstract prepare(): void;

	get template() { // формирует HTML код для вывода
		return JSON.stringify(this.state, null, 2);
	}

	initState(initialState = {} as ToolbarState) { // инициализируем локальный state
		this.state = {...initialState};
	}

	setState(newState: ToolbarState) { // изменяем локальный state, обновляем отображение элемента
		this.state = {...this.state, ...newState}; // меняет локальный state
		this.$root.html(this.template); // обновляет отображение тулбара из локального state
	}
}
