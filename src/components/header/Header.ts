import {ExcelComponent} from '../../core/ExcelComponent';
import {ExcelComponentOptions, StatePropertyValue} from '../../core/types';
import {DomInstance} from '../../core/dom';

export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root: DomInstance, options: ExcelComponentOptions) {
		super($root, {
			name: 'Header',
			// listeners: [],
			...options
		});
	}

	public prepare() { // запускается в конструкторе родительского класса
	}

	public toHTML(): string {
		return `<input type="text" class="input" value="Новая таблица" />

		<div>

				<div class="button">
		<i class="material-icons">delete</i>
				</div>

				<div class="button">
		<i class="material-icons">exit_to_app</i>
				</div>

				</div>`;
	}

	storeChanged(changes: {[key: string]: StatePropertyValue}): void {
		console.log('changes: ', changes);
	}
}