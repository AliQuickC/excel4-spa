import {ExcelComponent} from '../../core/ExcelComponent';
import {$, DomInstance} from '../../core/dom';
import {ExcelComponentOptions, State} from '../../core/types';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';
	private $formula!: DomInstance;

	constructor($root: DomInstance, options: ExcelComponentOptions) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			subscribe: ['currentText'],
			...options
		});
	}

	public init() {
		super.init();

		this.$formula = this.$root.find('#formula');

		this.$on('table:select', ($cell: DomInstance): void => {	// добавить обработчик события
			//												// при выборе ячейки в таблице, показываем в формуле данные,
			this.$formula.text($cell.data.value || '');							// из дата атрибута ячейки
		});
	}

	public prepare() { // запускается в конструкторе родительского класса
	}

	public toHTML(): string {
		return `
			<div class="info">fx</div>
			<div class="input" id="formula" contenteditable spellcheck="false"></div>`;
	}

	public storeChanged({currentText}: Partial<State>): void {
		this.$formula.text(currentText as string);
		console.log('Formula Changes: ', currentText);
	}

	protected onInput(event: InputEvent): void {
		this.$emit('formula:input', $(<HTMLElement>event.target).text());	// вызов события, при вводе в формулу,
		//																								// дублирует данные в ячейку таблици, обновляет state
	}

	protected onKeydown(event: KeyboardEvent) {
		const keys = ['Enter', 'Tab'];
		if (keys.includes(event.key)) {
			event.preventDefault();
			this.$emit('formula:done');	// вызов события
		}
	}
}
