import {ExcelComponent} from '../../core/ExcelComponent';
import {ExcelComponentOptions} from '../../core/types';
import {Dom} from '../../core/dom';

export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root: Dom, options: ExcelComponentOptions) {
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
}