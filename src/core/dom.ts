export class Dom {
	$el: HTMLElement;
	constructor(selector: string | HTMLElement) {
		this.$el = typeof selector === "string"
			? document.querySelector(selector) as HTMLElement
			:	selector;
	}

	// вставляет html в корень DOM элемента, который обернут объектом класса Dom
	html(html: string): Dom | string {
		if (typeof html === "string") {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.outerHTML.trim();
	}

	// очищает содержимое DOM элемента
	clear(): Dom {
		this.html("");
		return this;
	}

	on(eventType: string, callback: (event: Event)=>void): void { // добавляет обрвботчик callback, для события eventType, DOM элементу, внутри объекта Dom
		this.$el.addEventListener(eventType, callback);
	}

	off(eventType: string, callback: (event: Event)=>void) { // удаляет обрвботчик callback, для события eventType, DOM элемента, внутри объекта Dom
		this.$el.removeEventListener(eventType, callback);
	}

	append(node: HTMLElement | Dom): Dom {
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
}

// оборачивает DOM элемент в объект
export function $(selector: string | HTMLElement): Dom {
	return new Dom(selector);
}

// создает DOM элемент с тегом tagName и классами classes,
// затем оборачивает DOM элемент в объект
$.create = (tagName: string, classes = ""): Dom => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}
	// return el;
	return $(el);
};