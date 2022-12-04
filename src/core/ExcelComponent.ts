import {DomListener} from './DomListener';
import {DomInstance} from './dom';
import {ExcelComponentOptions} from './types';
import {Emitter} from './Emitter';

export abstract class ExcelComponent extends DomListener {
	public readonly name: string;
	protected emitter: Emitter;
	private unsubscribers: Array<()=>void>;

	protected constructor($root: DomInstance, options: ExcelComponentOptions = {} as ExcelComponentOptions) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.unsubscribers = [];

		this.prepare();
	}

	// абстрактный метод, переопределяется в наследуемом классе(DOM элементе)
	abstract toHTML(): string;

	// настраивает компонент до init()
	abstract prepare(): void;

	// вызов события
	protected $emit(event: string, ...args: any[]) {
		this.emitter.emit(event, ...args);
	}

	// добавить обработчик события event (подписка)
	protected $on(event: string, fn: (args: any) =>void) {
		const unsub = this.emitter.addEventListener(event, fn);
		this.unsubscribers.push(unsub);
	}

	// инициализация объекта DOM
	// добавляет слушателей
	protected init(): void {
		this.onComponentEvents(); // создание событий для DOM элемента
	}

	// удаляет слушателей
	// удаляет коммпонент
	public destroy(): void {
		this.offComponentEvents(); // удаление событий для DOM элемента
		this.unsubscribers.forEach(unsub => unsub()); // удаление подписок на события
	}
}
