import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$, DomInstance} from '../../core/dom';
import {resizeHandler} from './table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {ActionDataResize, ExcelComponentOptions, State, ToolbarState} from '../../core/types';
import * as actions from '../../redux/actions';
import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';

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
		return createTable(20, this.store.getState());
	}

	public prepare(): void { // запускается в конструкторе родительского класса
		this.selection = new TableSelection(); // объект реализует логику выделения ячейки/ячеек
	}

	public init() {
		super.init();

		// ищет ячейку в DOM элементе excel__table, this.$root - объект класса Dom
		this.selectCell(this.$root.find('[data-id="0:0"]')); // делаем DOM ячейку выбранной, при открытии документа

		this.$on('formula:input', (value: string): void => {
			this.selection.current
				.attr('data-value', value)	// присвоить значение дата атрибуту выбранной ячейки
				.text(parse(value));				// !!! меняем не из state
			this.updateTextInStore(value);
		});

		this.$on('formula:done', (): void => { // добавить обработчик события, если в формуле Enter или Tab
			this.selection.current.focus();	//				// смена фокуса из формулы на активную ячейку,
		});

		this.$on('toolbar: applyStyle', (value: Partial<ToolbarState>): void => { // добавляет обработчик события,
			//																	// изменение стиля в тулбаре, кнопками
			this.selection.applyStyle(value);		// применить стиль, из объекта value, к выделенным ячейкам
			this.$dispatch(actions.applyStyle({ // стили, для выделенных ячеек, сохранить в state
				value, //													// стиль который нужно применить к ячейкам
				ids: this.selection.selectedIds 	// массив объектов, c id выделенных ячеек
			}));
		});
	}

	// выбор ячейки DOM
	private selectCell($cell:DomInstance): void {
		(this.selection).select($cell);			// делаем ячейку выбранной, $cell - объект класса Dom

		this.$emit('table:select', $cell);	// вызов события, выбор ячейки, при выборе ячейки в таблице,
		//	дублировать значение, в формуле содержимое ячейки, в кнопках тулбара состояние стилей.

		const styles = $cell.getStyles(Object.keys(defaultStyles)); // считываем стили у выбранной ячейки, в объект
		// styles - объект со всеми стилями для выделенной ячейки, Object.keys(defaultStyles) - массив ключей(css свойств)

		// сработка события, изменение state, в state.currentStyles сохраняем стили выделенной ячейки
		this.$dispatch(actions.changeStyles(styles as ToolbarState));	// передаем объект со стилями styles,
		//																				// меняем свйство currentStyles в state(rootReducer)
		//																				// для компонент подписанных на изменение state(subscribeComponents),
		//																				// storeChanged() Отображаем в соответствии с новым state
	}

	async resizeTable(event: MouseEvent) {
		try {
			const data = await resizeHandler(this.$root, event) as ActionDataResize; // обработка ресайза таблици
			this.$dispatch(actions.tableResize(data)); // когда ресайз закончен, сработка события, изменение state
		} catch (error: InstanceType<Error>) {
			console.warn('Resize error', error.message);
		}
	}

	protected onMousedown(event: MouseEvent): void {
		if (shouldResize(event)) { // если событие произошло на маркере ресайза, и у элемента есть дата атрибут data-resize
			this.resizeTable(event);
			// resizeHandler(this.$root, event); // обработка ресайза таблици
		} else if (isCell(event)) { // если событие произошло на ячейке
			const $target: DomInstance = $(<HTMLElement>event.target);

			if (event.shiftKey) { // событие на ячейке, с зажатым shift, групповое выделение ячеек
				const $cells = matrix($target, (this.selection.current) as DomInstance) // массив строк, список всех выбранных ячеек
					.map(id => this.$root.find(`[data-id="${id}"]`)); // массив элементов(ячеек) со страници,
					//																								// которые были выделены
				this.selection.selectGroup($cells); // выделение гуппы ячеек
			} else {
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

	private updateTextInStore(value: string) { // обновление данных в state
		this.$dispatch(actions.changeText({ // сработка события, изменение state,
			//																		// меняет currentText и dataState в state(rootReducer)
			//																		// для компонент подписанных на изменение state(subscribeComponents),
			//																		// запуском storeChanged() Отображаем в соответствии с новым state (данные в формуле)
			id: this.selection.current.id(),	// получаем из выделенной ячейки, значение data-id, id() метод класса Dom
			value //													// содержимое ячейки
		}));
	}

	public storeChanged(changes: Partial<State>): void {
		console.log('Table Changes: ', changes);
	}

	private onInput(event: KeyboardEvent): void {
		this.updateTextInStore($(event.target as HTMLElement).text());	// обновление данных в state
		//																															// обновление данных в формуле
	}
}
