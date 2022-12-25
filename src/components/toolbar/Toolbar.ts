import {ExcelComponent} from '../../core/ExcelComponent';
import {DomInstance} from '../../core/dom';
import {ExcelComponentOptions} from '../../core/types';

export class Toolbar extends ExcelComponent {
	static className = 'excel__toolbar';

	constructor($root: DomInstance, options: ExcelComponentOptions) {
		super($root, {
			name: 'Toolbar',
			// listeners: ['click'],
			...options
		});
	}

	public prepare() { // запускается в конструкторе родительского класса
	}

	public toHTML(): string {
		return 			`<div class="button">
		<i class="material-icons">format_align_left</i>
				</div>

				<div class="button">
		<i class="material-icons">format_align_center</i>
				</div>

				<div class="button">
		<i class="material-icons">format_align_right</i>
				</div>

				<div class="button">
		<i class="material-icons">format_bold</i>
				</div>

				<div class="button">
		<i class="material-icons">format_italic</i>
				</div>

				<div class="button">
		<i class="material-icons">format_underlined</i>
				</div>`;
	}

	protected onClick(event: Event): void {
		console.log(event.target);
	}
}