import { Action, ActionType, State, Store } from './types';

export function createStore(rootReducer: (state: State, action: Action) => State , initialState: State = {} as State): Store {
	let state = rootReducer({...initialState}, {type: ActionType.Init}); // передаем state, получаем state
	let listeners: Array<(...args: Array<any>)=>void> = []; // массив ф-ций, подписок

	return {
		subscribe: function(fn: (state: State)=>void) { // подписка на событие, изменение state
			listeners.push(fn);
			return {
				unsubscribe() {
					listeners = listeners.filter(l => l !== fn);
				}
			};
		},
		dispatch: function(action: Action): void {				// изменяет state + сработка события, изменение state
			state = rootReducer(state, action);							// редюсер, меняет state
			listeners.forEach(listener => listener(state));	// сработка события на изменение state
		},
		getState: function() {
			return JSON.parse(JSON.stringify(state));				// клонируем объект, для избежания мутации
		}
	};
}
