import { ExcelComponent } from '../../core/ExcelComponent';
import { ExcelComponentOptions, State } from '../../core/types';
import { $, DomInstance } from '../../core/dom';
import { changeTitle } from '../../redux/actions';
import { defaultTitle } from '../../constants';

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
		console.log('changes: ', changes);
	}

	private onInput(event: Event) {
		const $target = $(event.target as HTMLElement);
		this.$dispatch(changeTitle($target.text()));
	}
}