import { Action, ActionDataCellsData, ActionDataChangeText, ActionDataResize, ActionType, ColsOrRowState, State } from './../core/types';

export function rootReducer(state: State, action: Action): State {
	let prevState;
	let field: string; // ключ state
	switch (action.type) {
	case ActionType.TableResize:
		field = (<ActionDataResize>action.data).resizerType === 'col' ? 'colState' : 'rowState';
		prevState = state[field as keyof State] || {} as ColsOrRowState;
		(<ColsOrRowState>prevState)[(<ActionDataResize>action.data).id] = (<ActionDataResize>action.data).value;
		return {...state, [field]: prevState};
	case ActionType.ChangeText:
		field = 'cellsDataState';
		// prevState = state[field] || {}
		// prevState[action.data.id] = action.data.value // добавляем свойство, объекту state.dataState
		// console.log(field)
		return {
			...state,
			currentText: (<ActionDataChangeText>action.data).value, // меняет currentText
			// dataState: prevState
			[field]: value(state, field as keyof State, action) // меняет cellsDataState
		};
	default:
		return state;
	}
}

// возвращает новое значение, части объекта state.
function value(state: State, field: keyof State, action: Action): ActionDataCellsData {
	const val = state[field] as ActionDataCellsData || {}; // часть объекта state, полученная по ключу field
	val[(<ActionDataCellsData>action.data).id] = (<ActionDataCellsData>action.data).value as string; // добавляем свойство объекту
	return val;
}
