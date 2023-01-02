import {$, DomInstance} from '../../core/dom';

export function resizeHandler($root: DomInstance, event: Event) { // обработка ресайза, после события onMousedown
	return new Promise(resolve => {
		const $resizer = $(event.target as HTMLElement); // элемент(маркер), на котором произошло событие
		const $parent = $resizer.closest('[data-type="resizable"]'); // получаем родительский элемент
		const coords = $parent.getCoords(); // получаем объект с данными, о текущем местоположении элемента(столбца/строки),
		//																	// размер которого меняем
		const resizerType = $resizer.data.resize; // тип родительского элемента, data-resize='row' или data-resize='col'
		const sideProp = resizerType === 'col' ? 'bottom' : 'right'; // макс значение 'bottom' или 'right' (колонки/строки)
		let value: number;

		$resizer.css({opacity: '1', [sideProp]: '-5000px'}); // задаем свойства маркеру, при его активации

		document.onmousemove = e => {		// двигаем маркер, для изменения размера столбца/строки
			if (resizerType === 'col') {	// если тянем колонку
				const delta = e.pageX - coords.right; // delta величина на которую нужно изменить ширину колонки
				//																		// e.pageX горизонтальная координата, относительно всего документа
				value = coords.width + delta;					// новое значение ширины колонки
				$resizer.css({right: -delta + 'px'}); // новая ширина в css
			} else { // если тянем строку
				const delta = e.pageY - coords.bottom;
				value = coords.height + delta;
				$resizer.css({bottom: -delta + 'px'});
			}
		};

		document.onmouseup = () => { // фиксируем новый размер столбца/строки
			document.onmousemove = null;
			document.onmouseup = null;
			value = Math.round(value);
			if (resizerType === 'col') { // если тянем колонку
				$parent.css({width: value + 'px'});
				$root.findAll(`[data-col='${$parent.data.col}']`)
					.forEach((el: Node): string => (<HTMLDivElement>el).style.width = value + 'px');
			} else {	// если тянем строку
				$parent.css({height: value + 'px'});
			}

			resolve({
				resizerType,
				value,
				id: resizerType === 'col' ? $parent.data.col : $parent.data.row,
			});

			$resizer.css({opacity: '0', bottom: '0', right: '0'}); // для маркера, устанавливаем начальное положение
		};
	});
}
