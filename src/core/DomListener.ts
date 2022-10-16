import {Dom} from "./dom";
import {capitalize} from "./utils";

export abstract class DomListener {
	// private listeners: {[key: string] : Array<(event: object) => void>};
	private listeners: Array<string>;
	public $root;
	abstract name: string;

	constructor($root: Dom, listeners: Array<string> = []) {
		if(!$root) {
			throw new Error ("No $root provided for DomListener!");
		}
		this.$root = $root;
		this.listeners = listeners;
		// this.listeners = new Object() as {[key: string]: Array<(event: object) => void> };
	}

	protected autoAddEventListeners(): void {
		this.listeners.forEach(listener => { // перебор массива со списком событий
			// внутри стрелочной ф-ции, контекст this сохраняется
			const method = getMethodName(listener); // формирование имени метода, из имени события
			if( !(this as any)[method] ) { // проверяем, что для события с именем method в объекте,
				//					                 // есть метод, обработчик такого события
				const name = this.name || ""; // имя элемента(компоненты), если было указано в конструкторе, при создании
				throw new Error(`Method ${method} is not implemented in ${name} Component`);
			}
			(this as any)[method] = (this as any)[method].bind(this); // привязка контекста this к методу
			this.$root.on(listener, (this as any)[method]); // добавляет обрвботчик this[method], для события listener,
			//                                    // DOM элементу(this.$el), обернутого объектом Dom(this.$root)
		});
	}

	protected autoRemoveEventListeners (): void {
		this.listeners.forEach(listener => { // перебор массива со списком событий
			const method = getMethodName(listener); // формирование имени события

			this.$root.off(listener, (this as any)[method]); // удаляет обрвботчик this[method], для события listener,
			// DOM элементу(this.$root), обернутого объектом Dom
		});
	}

	// protected _triggerEvent(eventName: string, event: object) { // универсальная ф-ция вызова различных событий
	// 	// if (!(this.listeners)) { // если объект listeners не существует
	// 	// 	this.listeners = {}; // создаем его
	// 	// }
	//
	// 	if ( this.listeners ) { // если массив eventName, внутри объекта listeners, существует
	// 		this.listeners[eventName].forEach((callback) => { // вызов ф-ций, из массива
	// 			callback(event);
	// 		});
	// 	}
	// }
	// public addEventListener(eventName: string, listener: (event: object) => void) { // ф-ция добавляет новые события, в массив ф-ций eventName, внутри объекта listeners
	// 	// if (!this.listeners) { // если объект listeners не существует
	// 	// 	this.listeners = {}; // создаем его
	// 	// }
	//
	// 	if (!this.listeners[eventName]) { // если массива listeners[eventName][] внутри объекта listeners не существует
	// 		this.listeners[eventName] = [];	// создаем его
	// 	}
	// 	this.listeners[eventName].push(listener);
	// }
	// public removeEventListener(eventName: string, listener: (event: object) => void) {
	// 	if ( this.listeners ) {  // если массива listeners[eventName][] внутри объекта listeners существует
	// 		const findListener = this.listeners[eventName].indexOf(listener);
	// 		if(findListener != -1) {
	// 			(this.listeners[eventName]).splice(findListener, 1);
	// 		}
	// 	}
	// }
}

// формирует имя события
function getMethodName(eventName: string): string {
	return "on" + capitalize(eventName);
}