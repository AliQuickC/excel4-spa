export class Emitter {
	private listeners: { [key: string]: Array<(...args: Array<any>)=>void> };

	constructor() {
		this.listeners = {};
	}

	// dispatch, fire, trigger
	// уведомляет слушателей если они есть
	emit(eventName: string, ...args: Array<any>) { // все args собираются в массив
		if (!Array.isArray(this.listeners[eventName])) {
			return false;
		}
		this.listeners[eventName].forEach(listener => {
			listener(...args); // args разворачиваются из массива
		});
		return true;
	}

	// on, listener
	// подписываемся на уведомление
	// Добавляем нового слушателя
	addEventListener(eventName: string, fn: (args: any) => void ) {
		this.listeners[eventName] = this.listeners[eventName] || [];
		this.listeners[eventName].push(fn);
		return () => { // ф-ция удаляет обработчик события remove EventListener
			this.removeEventListener(eventName, fn);
			// this.listeners[eventName] =
			// 	this.listeners[eventName].filter(listener => listener !== fn);
		};
	}

	removeEventListener(eventName: string, fn: (args: any)=>void) {
		this.listeners[eventName] =
			this.listeners[eventName].filter(listener => listener !== fn);
	}
}
