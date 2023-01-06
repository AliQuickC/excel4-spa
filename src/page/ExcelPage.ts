import { ComponentClass, State } from '../core/types';
import { Page } from '../core/page';
import { createStore } from '../core/createStore';
import { rootReducer } from '../redux/rootReducer';
import { debounce, storage } from '../core/utils';
import { Excel } from '../components/excel/Excel';
import { Toolbar } from '../components/toolbar/Toolbar';
import { Header } from '../components/header/Header';
import { Formula } from '../components/formula/Formula';
import { Table } from '../components/table/Table';
import { normalizeInitialState } from '../redux/initialState';

function storageName(param: string) {
	return 'excel:' + param;
}

export class ExcelPage extends Page {
	private excel!: Excel;

	public getRoot() {
		const params = this.params ? this.params : Date.now().toString();

		const state = storage(storageName(params)); // получаем state(excel:123) из local storage
		//																params		- параметром передаются данные из адресной строки
		//									 (storageName(params))	- имя ключа в local storage

		// обновляем state для открытой страници excel, создаем Store заново
		const store = createStore(rootReducer
			, normalizeInitialState(state) // инициализация state, загрузка данных из local store,
		);													// если данных в local store нет, инициализируем его шаблонным объектом

		const stateListenes = debounce((state: State) => { // блокируем вызов ф-ции, если появился новый вызов этой ф-ции
			if(process.env.NODE_ENV === 'development') {
				console.log('App State: ', state);
			}
			storage(storageName(params), state); // записываем state в local store (params excel:123)
		}, 500);

		store.subscribe(stateListenes); // добавить обработчик события, изменение state, пишем данные в local storege

		// получает как свойство, элемент id="app" со страници, '#app' оборачивает в объект класса Dom, сохраняет в this.$el
		// получает список компонент - дочерних элементов
		this.excel = new Excel({
			components: [Header, Toolbar, Formula, Table] as Array<ComponentClass>,
			store
		});

		// вставляет DOM элемент Excel на страниуцу, в корневой элемент '#app',
		// предварительно компонент Excel заполняется дочерними компонентами
		// перебирает дочерние компоненты, для каждого делает инициализацию - назначение обработчиков событий
		return this.excel.getRoot();
	}

	public afterRender() {
		this.excel.init();
	}

	public destroy() {
		this.excel.destroy();
	}
}
