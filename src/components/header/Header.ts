import { ExcelComponent } from '../../core/ExcelComponent';
import { ExcelComponentOptions, State } from '../../core/types';
import { $, DomInstance } from '../../core/dom';
import { changeTitle } from '../../redux/actions';
import { defaultTitle } from '../../constants';
import { debounce } from '../../core/utils';
import { ActiveRoute } from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root: DomInstance, options: ExcelComponentOptions) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			...options
		});
	}

	public prepare() {														// запускается в конструкторе родительского класса
		this.onInput = debounce(this.onInput, 500);	// блокируем вызов ф-ции, если появился новый вызов этой ф-ции
	}

	public toHTML(): string {
		const title = this.store.getState().title || defaultTitle; // клонируем объект state, берем его поле title
		return `
	<input type="text" class="input" value="${title}" />
	<div>
		<div class="button" data-button="remove">
			<i class="material-icons" data-button="remove">delete</i>
		</div>
		<div class="button" data-button="exit">
			<i class="material-icons" data-button="exit">exit_to_app</i>
		</div>
	</div>`;
	}

	private onInput = (event: Event): void => {
		const $target = $(event.target as HTMLElement);
		this.$dispatch(changeTitle($target.text()));
	};

	private onClick(event: Event): void {
		const $target = $(event.target as HTMLElement);

		if ($target.data.button === 'remove') {
			const decign = confirm('Вы действительно хотите удалить эту таблицу?');

			if (decign) {
				localStorage.removeItem('excel:' + ActiveRoute.param);
				ActiveRoute.navigate('');
			}
		} else if ($target.data.button === 'exit') {
			ActiveRoute.navigate('');
		}
	}
}
