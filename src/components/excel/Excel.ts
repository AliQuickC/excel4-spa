import {ComponentClass, Instance, Store} from '../../core/types';
import {$, DomInstance} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import { StoreSubscriber } from '../../core/StoreSubscriber';
import { updateDate } from '../../redux/actions';

export class Excel {
	private components!: Array<ComponentClass> | Array<Instance>;
	private emitter: Emitter;
	private store: Store;
	private subscriber: StoreSubscriber;

	constructor(options: {components: ComponentClass[], store: Store}) {
		this.components = options.components || [];
		this.emitter = new Emitter();
		this.store = options.store;
		this.subscriber = new StoreSubscriber(this.store);
	}

	public getRoot(): DomInstance {
		const $root = $.create('div', 'excel');
		const componentOptions = {
			emitter: this.emitter,
			store: this.store,
		};

		this.components = this.components.map((Component) => {
			const $el: DomInstance = $.create('div', (<ComponentClass>Component).className); // корневой DOM для компонента
			const component: Instance = new (<ComponentClass>Component)($el, componentOptions);
			$el.html(component.toHTML());
			$root.append($el);
			return component;
		});

		return $root;
	}

	public init(): void {
		this.store.dispatch(updateDate());

		this.subscriber.subscribeComponents(this.components as Instance[]); // проверка, какое свойство state изменилось,
		// если компонент подписан на изменение, этого свойства объекта state, срабатывает storeChanged() внутри компонента

		this.components.forEach(component => (<Instance>component).init());
	}

	public destroy(): void {
		this.subscriber.unsubscribeFromStore();
		(<Array<Instance>>this.components).forEach((component) => component.destroy());
	}
}
