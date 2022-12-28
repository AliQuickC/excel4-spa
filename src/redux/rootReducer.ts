import { Action, ActionData, ActionType, ColState, State } from './../core/types';

export function rootReducer(state: State, action: Action): State {
	let prevState;
	switch (action.type) {
	case ActionType.TableResize:
		prevState = state.colState || {} as ColState;
		prevState[(<ActionData>action.data).id] = (<ActionData>action.data).value;
		return {...state, colState: prevState};
	default:
		return state;
	}
}
