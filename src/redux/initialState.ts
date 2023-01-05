import { defaultStyles, defaultTitle } from '../constants';
import { State } from '../core/types';
import { clone } from '../core/utils';

const defaultState = {
	title: defaultTitle,
	rowState: {},
	colState: {},
	cellsDataState: {},
	stylesState: {},
	currentText: '',
	currentStyles: defaultStyles,
	openedDate: new Date().toJSON(), // представление объекта Date в виде JSON строки
};

const normalize = (state: State) => ({
	...state,
	currentStyles: defaultStyles,
	currentText: ''
});

// export const initialState = storage('excel-state') ?	// если значение в local store есть
// 	normalize(storage('excel-state')) : //							// вернуть это значение из local store
// 	defaultState; //																		// иначе вернуть объект инициализирующий state

export function normalizeInitialState(state: State): State {
	return state ? normalize(state) : clone(defaultState);	// если значение в local store есть(было прочитано в state), нормализуем,
	//																											// иначе задаем дефолтное значение
}
