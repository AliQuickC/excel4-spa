import {DomListener} from './DomListener';
import {DomInstance} from './dom';
import { Action, EventHandler, Events, ExcelComponentOptions, State, Store } from './types';
import {Emitter} from './Emitter';

export abstract class ExcelComponent extends DomListener {
	public readonly name: string;
	protected emitter: Emitter;
	private subscribe: Array<string>;
	protected store: Store;
	private unsubscribers: Array<()=>void>;

	protected constructor($root: DomInstance, options: ExcelComponentOptions = {} as ExcelComponentOptions) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.subscribe = options.subscribe || [];
		this.store = options.store;
		this.unsubscribers = [];

		this.prepare();
	}

	// абстрактный метод, переопределяется в наследуемом классе(DOM элементе)
	abstract toHTML(): string;

	// настраивает компонент до init()
	abstract prepare(): void;

	// Сюда приходят изменения только по тем полям, на которые мы подписались
	abstract storeChanged(changes: Partial<State>): void;

	// вызов события
	protected $emit(event: Events, ...args: Array<any>): void {
		this.emitter.emit(event, ...args);
	}

	// добавить обработчик события event (подписка)
	protected $on(event: Events, fn: 	EventHandler): void {
		const unsub = this.emitter.addEventListener(event, fn);
		this.unsubscribers.push(unsub);
	}

	protected $dispatch(action: Action): void {
		this.store.dispatch(action);
	}

	// при изменение state, проверяем наличие подписки в this.subscribe, у компоненты для ключа key
	public isWatching(key: string): boolean {
		return this.subscribe.includes(key);
	}

	// инициализация объекта DOM
	// добавляет слушателей
	protected init(): void {
		this.onComponentEvents(); // создание событий для DOM элемента
	}

	// удаляет слушателей
	// удаляет коммпонент
	public destroy(): void {
		this.offComponentEvents();										// удаление событий для DOM элемента
		this.unsubscribers.forEach(unsub => unsub());	// удаление подписок на события
	}
}
