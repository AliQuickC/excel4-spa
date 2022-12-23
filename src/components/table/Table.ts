import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$, DomInstance} from '../../core/dom';
import {resizeHandler} from './table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {ExcelComponentOptions} from '../../core/types';

export class Table extends ExcelComponent {
	static readonly className = 'excel__table';
	// private selection: InstanceType<typeof TableSelection> | undefined;
	private selection!: TableSelection;

	constructor($root: DomInstance, options: ExcelComponentOptions) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		});
	}

	public toHTML(): string {
		return createTable(20);
	}

	public prepare(): void { // запускается в конструкторе родительского класса
		this.selection = new TableSelection(); // объект реализует логику выделения ячейки/ячеек
	}

	public init() {
		super.init();

		// ищет ячейку в DOM элементе excel__table, this.$root - объект класса Dom
		this.selectCell(this.$root.find('[data-id="0:0"]')); // делаем DOM ячейку выбранной, при открытии документа

		this.$on('formula:input', (text: string): void => {
			// console.log('text', text);
			this.selection.current.text(text);
		});

		this.$on('formula:done', (): void => { // добавить обработчик события, если в формуле Enter или Tab
			this.selection.current.focus();	//				// смена фокуса из формулы на активную ячейку,
		});
	}

	// выбор ячейки DOM
	private selectCell($cell:DomInstance): void {
		(this.selection).select($cell); // делаем ячейку выбранной, $cell - объект класса Dom

		this.$emit('table:select', $cell); // вызов события, выбор ячейки, при выборе ячейки в таблице,
		//  дублировать значение, в формуле содержимое ячейки, в кнопках тулбара состояние стилей.

		// const styles = $cell.getStyles(Object.keys(defaultStyles)); // считываем стили у выбранной ячейки, в объект
		// styles - объект со всеми стилями для выделенной ячейки, Object.keys(defaultStyles) - массив ключей(css свойств)

		// сработка события, изменение state
		// this.$dispatch(actions.changeStyles(styles));	// передаем объект со стилями styles,
		//                                           	// меняем свйство currentStyles в state(rootReducer)
		//                                           	// для компонент подписанных на изменение state(subscribeComponents),
		//                                           	// storeChanged() Отображаем в соответствии с новым state
	}

	protected onMousedown(event: MouseEvent): void {
		if (shouldResize(event)) { // если событие произошло на маркере ресайза, и у элемента есть дата атрибут data-resize
			resizeHandler(this.$root, event); // обработка ресайза таблици
		} else if (isCell(event)) { // если событие произошло на ячейке
			const $target: DomInstance = $(<HTMLElement>event.target);

			if (event.shiftKey) { // событие на ячейке, с зажатым shift, групповое выделение ячеек
				const $cells = matrix($target, (this.selection.current) as DomInstance) // массив строк, список всех выбранных ячеек
					.map(id => this.$root.find(`[data-id="${id}"]`)); // массив элементов(ячеек) со страници,
					//																								// которые были выделены
				this.selection.selectGroup($cells); // выделение гуппы ячеек
			} else {
				// this.selection.select($target);
				// this.$emit('table:input', $(<HTMLElement>event.target));
				this.selectCell($target);
			}
		}
	}

	protected onKeydown(event: KeyboardEvent) { // нажата одна из кнопок навигации по ячейкам таблици
		const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];


		const {key} = event; // кнопка по которой сработало событие

		if (keys.includes(key) && !event.shiftKey) { // если нажата кнопка, и при этом не была зажата shift
			event.preventDefault();

			const id = (this.selection.current as DomInstance).id(true); // текущая ячейка (объект с координатами ячейки)
			const $next = this.$root.find(nextSelector(key, id)); // определяем ячейку, куда надо перейти

			this.selectCell($next);	// устанавливаем ячейку как выбранную
			//											// $next элемент(ячейка) на которую осуществляется переход
		}
	}

	onInput(event: KeyboardEvent): void {
		this.$emit('table:input', $(<HTMLElement>event.target));
	}

	onMouseup(): void {
		console.log('mouseup');
	}
}
