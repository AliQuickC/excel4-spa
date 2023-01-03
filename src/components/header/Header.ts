import { ExcelComponent } from '../../core/ExcelComponent';
import { ExcelComponentOptions, State } from '../../core/types';
import { $, DomInstance } from '../../core/dom';
import { changeTitle } from '../../redux/actions';
import { defaultTitle } from '../../constants';
import { debounce } from '../../core/utils';

export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root: DomInstance, options: ExcelComponentOptions) {
		super($root, {
			name: 'Header',
			listeners: ['input'],
			...options
		});
	}

	public prepare() { // запускается в конструкторе родительского класса
		this.onInput = debounce(this.onInput, 500); // блокируем вызов ф-ции, если появился новый вызов этой ф-ции
	}

	public toHTML(): string {
		const title = this.store.getState().title || defaultTitle; // клонируем объект state, берем его поле title
		return `
	<input type="text" class="input" value="${title}" />
	<div>
		<div class="button">
			<i class="material-icons">delete</i>
		</div>
		<div class="button">
			<i class="material-icons">exit_to_app</i>
		</div>
	</div>`;
	}

	public storeChanged(changes: Partial<State>): void {
		console.log('Header changes: ', changes);
	}

	private onInput = (event: Event): void => {
		const $target = $(event.target as HTMLElement);
		this.$dispatch(changeTitle($target.text()));
	};
}