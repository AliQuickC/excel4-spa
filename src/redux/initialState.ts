import { defaultStyles } from '../constants';
import { State } from '../core/types';
import { storage } from '../core/utils';

const defaultState = {
	rowState: {},
	colState: {},
	cellsDataState: {},
	stylesState: {},
	currentText: '',
	currentStyles: defaultStyles,
};

const normalize = (state: State) => ({
	...state,
	currentStyles: defaultStyles,
	currentText: ''
});

export const initialState = storage('excel-state') ?	// если значение в local store есть
	normalize(storage('excel-state')) : //							// вернуть это значение из local store
	defaultState; //																		// иначе вернуть объект инициализирующий state
