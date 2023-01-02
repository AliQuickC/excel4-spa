import {cellId, Style} from './types';

export type DomInstance = InstanceType<typeof Dom>;

class Dom {
	private $el: HTMLElement;

	constructor(selector: string | HTMLElement) {
		this.$el = typeof selector === 'string'
			? document.querySelector(selector) as HTMLElement
			:	selector;
	}

	// вставляет html в корень DOM элемента, который обернут объектом класса Dom
	public html(html: string): DomInstance | string {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.outerHTML.trim();
	}

	public text(): string;
	public text(text: string): DomInstance;
	public text(text?: string | undefined): DomInstance | string { // заполняет содержимое элемента текстом
		if (typeof text !== 'undefined') {	// если в элемент введен текст
			this.$el.textContent = text;			// меняем свойство textContent (текстовое содержимое элемента)
			return this;
		}
		if (this.$el.tagName.toLowerCase() === 'input') { // если элемент типа input
			return (<HTMLInputElement>this.$el).value.trim(); //							// меняем свойство value
		}
		return (this.$el.textContent as keyof Node).trim();
	}

	// очищает содержимое DOM элемента
	public clear(): DomInstance {
		this.html('');
		return this;
	}

	public on(eventType: string, callback: (event: Event)=>void): void { // добавляет обрвботчик callback, для события eventType, DOM элементу, внутри объекта Dom
		this.$el.addEventListener(eventType, callback);
	}

	public off(eventType: string, callback: (event: Event)=>void): void { // удаляет обрвботчик callback, для события eventType, DOM элемента, внутри объекта Dom
		this.$el.removeEventListener(eventType, callback);
	}

	public append(node: HTMLElement | DomInstance): DomInstance {
		if (node instanceof Dom) { // если node является инстанцом класса Dom,
			node = node.$el; // node присваиваем Dom элемент,
		} // иначе предполагается что node это нативный элемент

		if (!Element.prototype.append) { // полифил, помещает DOM элемент в документ
			this.$el.appendChild(node);
		} else {
			this.$el.append(node);
		}
		return this;
	}

	public get data(): DOMStringMap { // доступ к дата атрибутам
		return this.$el.dataset;
	}

	public closest(selector: string): DomInstance { // возвращает родительский элемент
		return $(<HTMLElement>(this.$el).closest(selector));
	}

	public getCoords(): DOMRect { // возвращает объект с данными о местоположении элемента и т.д.
		return this.$el.getBoundingClientRect();
	}

	public find(selector: string): DomInstance {
		return $(this.$el.querySelector(selector) as HTMLElement);
	}

	public findAll(selector: string): NodeList { // ищет ячейки по селектору
		return this.$el.querySelectorAll(selector);
	}

	public css<T extends CSSStyleDeclaration>(styles: Style): void { // преобразует стили из объекта в css свойство
		Object
			.keys(styles)
			.forEach((key) => (<T>(this.$el.style))[key as keyof T] = (styles)[key] as T[keyof T]);
	}

	public id(): string;
	public id(parse: unknown): cellId;
	public id(parse?: unknown): string | cellId {
		if (parse) { // если true, возвращаем объект с координатами ячейки
			const parsed = (<string>this.id()).split(':'); // разбираем строку на массив
			return { // объект с координатами ячейки
				row: +parsed[0],
				col: +parsed[1]
			};
		}
		// data - геттер
		return this.data.id as string; // считываем и возвращаем, дата атрибут data-id
	}

	public focus(): DomInstance { // фокус на элемент при выделении
		this.$el.focus(); // фокус ввода на элемент
		return this;
	}

	public addClass(className: string): DomInstance {
		this.$el.classList.add(className);
		return this;
	}

	public removeClass(className:string): DomInstance {
		this.$el.classList.remove(className);
		return this;
	}

	public getStyles(styles: Array<string> = []): Style { // считывает css стили DOM элемента, сохраняем в объект
		// для каждого свойства(элемента массива), считывает css значение
		return styles.reduce((res: Style, s: keyof Style) => {
			(res)[s] = ((this.$el.style)[s as keyof CSSStyleDeclaration]) as string; // формируем объект со стилями
			return res;
		}, {});
	}
}

// оборачивает DOM элемент в объект
export function $(selector: string | HTMLElement): DomInstance {
	return new Dom(selector);
}

// создает DOM элемент с тегом tagName и классами classes,
// затем оборачивает DOM элемент в объект
$.create = (tagName: string, classes = ''): DomInstance => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}

	return $(el);
};
