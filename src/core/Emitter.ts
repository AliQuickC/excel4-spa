import { EventHandler, Events } from './types';

export class Emitter {
	private listeners: { [key: string]: Array<(...args: Array<any>)=>void> };
	// private readonly listeners: Record<Events, EventHandler[]> = {} as Record<Events, EventHandler[]>;

	constructor() {
		this.listeners = {};
	}

	// dispatch, fire, trigger
	// уведомляет слушателей если они есть
	public emit = (eventName: Events, ...args: Array<any>): boolean => { // все args собираются в массив
		if (!Array.isArray(this.listeners[eventName])) {
			return false;
		}
		this.listeners[eventName].forEach(listener => {
			listener(...args); // args разворачиваются из массива
		});
		return true;
	};

	// on, listener
	// подписываемся на уведомление
	// Добавляем нового слушателя
	public addEventListener = (eventName: Events, fn: EventHandler) => {
		this.listeners[eventName] = this.listeners[eventName] || [];
		this.listeners[eventName].push(fn);
		return () => { // ф-ция удаляет обработчик события remove EventListener
			this.removeEventListener(eventName, fn);
		};
	};

	removeEventListener(eventName: Events, fn: EventHandler) {
		this.listeners[eventName] =
			this.listeners[eventName].filter(listener => listener !== fn);
	}
}
