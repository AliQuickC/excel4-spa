import {ComponentClass, Instance, Store} from '../../core/types';
import {$, DomInstance} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import { StoreSubscriber } from '../../core/StoreSubscriber';

export class Excel {
	private $parentEl;
	private components!: Array<ComponentClass> | Array<Instance>;
	private emitter: Emitter;
	private store: Store;
	private subscriber: StoreSubscriber;

	constructor(selector: string, options: {components: Array<ComponentClass>, store: Store}) {
		this.$parentEl = $(selector);
		this.components = options.components || [];
		this.emitter = new Emitter();
		this.store = options.store; // store
		this.subscriber = new StoreSubscriber(this.store);
	}

	private getRoot(): DomInstance {
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

	public render(): void {
		this.$parentEl.append(this.getRoot());

		this.subscriber.subscribeComponents(this.components as Instance[]); // !!!

		this.components.forEach(component => (<Instance>component).init());
	}

	private destroy() {
		this.subscriber.unsubscribeFromStore();
		(<Array<Instance>>this.components).forEach((component) => component.destroy());
	}
}
