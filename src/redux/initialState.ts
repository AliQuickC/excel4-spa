import { State } from '../core/types';
import { storage } from '../core/utils';

const defaultState = {
	rowState: {},
	colState: {},
	cellsDataState: {},
	currentText: '',
};

const normalize = (state: State) => ({
	...state,
	// currentStyle: defaultStyles,
	currentText: ''
});

export const initialState = storage('excel-state') ? // если значение в local store есть
	normalize(storage('excel-state')) : //                        // вернуть это значение из local store
	defaultState; //                                        // иначе вернуть объект инициализирующий state