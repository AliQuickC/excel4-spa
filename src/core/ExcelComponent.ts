import {DomListener} from "./DomListener";
import {Dom} from "./dom";
import {ExcelComponentOptions} from "./types";

export abstract class ExcelComponent extends DomListener {
	public name: string;

	constructor($root: Dom, options: ExcelComponentOptions = {} as ExcelComponentOptions) {
		super($root, options.listeners);
		this.name = options.name || "";
	}

	// инициализация объекта DOM
	// добавляет слушателей
	protected init(): void {
		this.componentAddEventListeners(); // создание событий для DOM элемента
	}

	// удаляет слушателей
	// удаляет коммпонент
	protected destroy(): void {
		this.componentRemoveEventListeners(); // удаление событий для DOM элемента
		// this.unsubscribers.forEach(unsub => unsub());
	}

	// абстрактный метод, переопределяется в наследуемом классе(DOM элементе)
	abstract toHTML(): string;
}
