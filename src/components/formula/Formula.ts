import {ExcelComponent} from '../../core/ExcelComponent';
import {Dom} from '../../core/dom';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

	constructor($root: Dom) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'click']
		});
	}

	prepare() { // запускается в конструкторе родительского класса
	}

	toHTML(): string {
		return `
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="false"></div>`;
	}

	onInput(event: Event): void {
		console.log('Formula input: ', event.target);
		// this.$emit('formula:input', $(event.target).text())	// вызов события, при вводе в формулу,
		//																											// дублирует данные в ячейку таблици, обновляет state
	}

	onClick(event: Event): void {
		console.log('onClick');
	}
}
