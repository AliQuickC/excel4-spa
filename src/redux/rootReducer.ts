import { Action, ActionDataApplyStyle, ActionDataChangeText, ActionDataResize, ActionType, ApplyStyle, ReducerData, State, ToolbarState } from './../core/types';

export function rootReducer(state: State, action: Action): State {
	let field: string; // ключ state
	let val: ApplyStyle; // значение по ключу state
	switch (action.type) {
	case ActionType.TableResize:
		field = (<ActionDataResize>action.data).resizerType === 'col' ? 'colState' : 'rowState';
		return {...state, [field]: value(state, field as keyof State, action)};	// меняет объект colState или rowState
	case ActionType.ChangeText:
		field = 'cellsDataState';
		return {
			...state,
			currentText: (<ActionDataChangeText>action.data).value, // меняет currentText
			[field]: value(state, field as keyof State, action) // меняет объект cellsDataState
		};
	case ActionType.ChangeStyles:
		return {...state, currentStyles: action.data as ToolbarState};
	case ActionType.ApplyStyle:
		field = 'stylesState';
		val = state[field as keyof State] as ApplyStyle || {}; // state.stylesState
		(<ActionDataApplyStyle>action.data).ids.forEach(id => { // для каждого id, из массива выделенных ячеек
			val[id] = {...val[id], ...(<ActionDataApplyStyle>action.data).value}; // считываем из state все стили выбранной ячейки,
			// state.stylesState[id] объект со всеми стилями, добавляем в него, меняемый стиль
		});
		return {
			...state,
			[field]: val,
			currentStyles: {...state.currentStyles, ...(<ActionDataApplyStyle>action.data).value}
		};
	case ActionType.ChangeTitle:
		return {...state, title: action.data as string};
	default:
		return state;
	}
}

// возвращает новое значение, части объекта state.
function value(state: State, field: keyof State, action: Action): ReducerData {
	const val = state[field as keyof State] || {};	// часть объекта state, полученная по ключу field
	(<ReducerData>val)[(<ReducerData>action.data).id as keyof ReducerData] = (<ReducerData>action.data).value as string; // добавляем свойство объекту
	return val as ReducerData;
}
