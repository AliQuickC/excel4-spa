import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$, Dom} from '../../core/dom';
import {resizeHandler} from './table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	// private selection: InstanceType<typeof TableSelection> | undefined;
	private selection: TableSelection | undefined;

	constructor($root: Dom) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown']
		});
	}

	toHTML(): string {
		return createTable(20);
	}

	prepare(): void { // запускается в конструкторе родительского класса
		this.selection = new TableSelection(); // объект реализует логику выделения ячейки/ячеек
	}

	init() {
		super.init();
		const $cell = this.$root.find('[data-id="0:0"]');
		(<TableSelection>this.selection).select($cell);
	}

	// выбор ячейки DOM
	selectCell($cell:Dom) {
		(<TableSelection>this.selection).select($cell); // делаем ячейку выбранной, $cell - объект класса Dom

		// this.$emit('table:select', $cell); // вызов события, выбор ячейки, при выборе ячейки в таблице,
		//  дублировать значение, в формуле содержимое ячейки, в кнопках тулбара состояние стилей.

		// const styles = $cell.getStyles(Object.keys(defaultStyles)); // считываем стили у выбранной ячейки, в объект
		// styles - объект со всеми стилями для выделенной ячейки, Object.keys(defaultStyles) - массив ключей(css свойств)

		// сработка события, изменение state
		// this.$dispatch(actions.changeStyles(styles));	// передаем объект со стилями styles,
		//                                           	// меняем свйство currentStyles в state(rootReducer)
		//                                           	// для компонент подписанных на изменение state(subscribeComponents),
		//                                           	// storeChanged() Отображаем в соответствии с новым state
	}

	onMousedown(event: MouseEvent): void {
		if (shouldResize(event)) { // если событие произошло на маркере ресайза, и у элемента есть дата атрибут data-resize
			resizeHandler(this.$root, event); // обработка ресайза таблици
		} else if (isCell(event)) { // если событие произошло на ячейке
			const $target: Dom = $(<HTMLElement>event.target);

			if (event.shiftKey) { // событие на ячейке, с зажатым shift, групповое выделение ячеек
				const $cells = matrix($target, ((<TableSelection>this.selection).current) as Dom) // массив строк, список всех выбранных ячеек
					.map(id => this.$root.find(`[data-id="${id}"]`)); // массив элементов(ячеек) со страници,
					//																								// которые были выделены
				(<TableSelection>this.selection).selectGroup($cells); // выделение гуппы ячеек
			} else {
				(<TableSelection>this.selection).select($target);
			}
		}
	}

	onKeydown(event: KeyboardEvent) { // нажата одна из кнопок навигации по ячейкам таблици
		const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

		const {key} = event; // кнопка по которой сработало событие

		if (keys.includes(key) && !event.shiftKey) { // если нажата кнопка, и при этом не была зажата shift
			event.preventDefault();

			const id = ((<TableSelection>this.selection).current as Dom).id(true); // текущая ячейка (объект с координатами ячейки)
			const $next = this.$root.find(nextSelector(key, id)); // определяем ячейку, куда надо перейти

			this.selectCell($next);	// устанавливаем ячейку как выбранную
			//											// $next элемент(ячейка) на которую осуществляется переход
		}
	}

	onMousemove(event: Event): void {
		console.log('mousemove');
	}

	onMouseup(event: Event): void {
		console.log('mouseup');
	}
}
