import {DomInstance} from './dom';
import {capitalize} from './utils';

export abstract class DomListener {
	private listeners: Array<string>;
	public $root: DomInstance;
	abstract name: string;

	constructor($root: DomInstance, listeners: Array<string> = []) {
		if(!$root) {
			throw new Error ('No $root provided for DomListener!');
		}
		this.$root = $root;
		this.listeners = listeners;
	}

	protected onComponentEvents(): void {
		this.listeners.forEach(listener => { // перебор массива со списком событий
			// внутри стрелочной ф-ции, контекст this сохраняется
			const method = getMethodName(listener) as keyof this; // формирование имени метода, из имени события
			if( !this[method] ) { // проверяем, что для события с именем method в классе,
				//					                 // нет метода, обработчик такого события, выводим ошибку
				const name = this.name || ''; // имя элемента(компоненты), если было указано в конструкторе, при создании
				throw new Error(`Method ${method as string} is not implemented in ${name} Component`);
			}
			(this[method] as unknown as ()=>void) = (this[method] as unknown as ()=>void).bind(this); // привязка контекста this к методу
			this.$root.on(listener, (this)[method] as unknown as ()=>void); // добавляет обрвботчик this[method],
			// для события listener, корневому DOM элементу(this.$el), обернутого объектом Dom(this.$root)
		});
	}

	protected offComponentEvents(): void {
		this.listeners.forEach(listener => { // перебор массива со списком событий
			const method = getMethodName(listener) as keyof this; // формирование имени события

			this.$root.off(listener, this[method] as unknown as ()=>void); // удаляет обрвботчик this[method], для события listener,
			// DOM элементу(this.$root), обернутого объектом Dom
		});
	}
}

// формирует имя события
function getMethodName(eventName: string): string {
	return 'on' + capitalize(eventName);
}
