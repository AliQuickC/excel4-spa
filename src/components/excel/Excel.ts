import {ComponentClass, Instance} from '../../core/types';
import {$, DomInstance} from '../../core/dom';
import {Emitter} from '../../core/Emitter';

export class Excel {
	private $parentEl;
	private components!: Array<ComponentClass> | Array<Instance>;
	public emitter: Emitter;

	constructor(selector: string, options: {components: Array<ComponentClass>}) { // !!!
		this.$parentEl = $(selector);
		this.components = options.components || [];
		this.emitter = new Emitter();
	}

	private getRoot(): DomInstance {
		const $root = $.create('div', 'excel');
		const componentOptions = {emitter: this.emitter};

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
		this.components.forEach(component => (<Instance>component).init());
	}

	private destroy() {
		// this.subscriber.unsubscribeFromStore();
		(<Array<Instance>>this.components).forEach((component) => component.destroy());
	}
}
