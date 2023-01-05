import { DashboardPage } from '../../page/DashboardPage';
import { ExcelPage } from '../../page/ExcelPage';
import {$, DomInstance} from '../dom';
import { Constructable } from '../types';
import { ActiveRoute } from './ActiveRoute';

export class Router {
	private $placeholder: DomInstance;
	private routes: {excel: Constructable<ExcelPage>, dashboard: Constructable<DashboardPage>};
	private page: null | DashboardPage | ExcelPage;

	constructor(selector: string, routes: {excel: Constructable<ExcelPage>, dashboard: Constructable<DashboardPage>}) {
		if (!selector) {
			throw new Error('Selector is not provided in Router');
		}

		this.$placeholder = $(selector); // корневой элемент, в который вкладываются страници
		this.routes = routes;

		this.page = null;

		this.changePageHandler = this.changePageHandler.bind(this);

		this.init(); // инициализация адресной строки
	}

	private init() {
		window.addEventListener('hashchange', this.changePageHandler);
		this.changePageHandler();
	}

	public changePageHandler() {
		if (this.page) {
			this.page.destroy();
		}
		this.$placeholder.clear(); // очистка содержимого

		const Page = ActiveRoute.path.includes('excel') ? // определяем какую страницу грузить
			this.routes.excel :
			this.routes.dashboard;
		// const Page = this.routes.excel; // класс выводит верстку
		// const Page = this.routes.dashboard; // класс выводит верстку

		this.page = new Page(ActiveRoute.param);	// создание страници,
		//																				// param - параметром передаются данные из адресной строки

		this.$placeholder.append(this.page.getRoot()); // вставляем верстку в корневой элемент '#app'

		this.page.afterRender(); // отрисовка вставленного содержимого
	}

	public destroy() {
		window.removeEventListener('hashchange', this.changePageHandler);
	}
}
