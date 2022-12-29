import { Action, ActionData, ActionType, ColState, State } from './../core/types';

export function rootReducer(state: State, action: Action): State {
	let prevState;
	let field: string; // ключ state
	switch (action.type) {
	case ActionType.TableResize:
		field = (<ActionData>action.data).resizerType === 'col' ? 'colState' : 'rowState';
		prevState = state[field as keyof State] || {} as ColState;
		prevState[(<ActionData>action.data).id] = (<ActionData>action.data).value;
		return {...state, [field]: prevState};
	default:
		return state;
	}
}
