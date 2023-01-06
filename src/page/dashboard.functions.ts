import { storage } from '../core/utils';

function toHTML(key: string): string {
	const model = storage(key);
	const id = key.split(':')[1];
	return `
    <li class="db__record">
      <a href="#excel/${id}">${model.title} ( hash: ${id} )</a>
      <strong>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
      </strong>
    </li>
  `;
}

// спиок ключей всех созданных таблиц
// excel:12346
function getAllKeys(): string[] {
	const keys = [];
	for (let i = 0; i<localStorage.length; i++) { // перебираем все ключи в LocalStorage
		const key = localStorage.key(i) as string;
		if (!key.includes('excel')) { // если в имени ключа отсутствует 'excel', переходим к следующей итерации
			continue;
		}
		keys.push(key);
	}
	return keys;
}

// возвращает верстку со списком документов
export function createRecordsTable(): string {
	const keys = getAllKeys() as string[];

	if (!keys.length) { // если массив со списком сохраненных документов пуст
		return '<p>Ни одной таблици не создано</p>';
	}

	return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>
  `;
}
