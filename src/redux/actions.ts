import { ActionData, ActionType } from '../core/types';

// Action Creators
export function tableResize(data: ActionData): {type: ActionType, data: ActionData} {
	return {
		type: ActionType.TableResize,
		data
	};
}

export function changeText<T>(data: T): {type: ActionType, data: T} {
	return {
		type: ActionType.ChangeText,
		data
	};
}

export function changeStyles<T>(data: T): {type: ActionType, data: T} {
	return {
		type: ActionType.ChangeStyles,
		data
	};
}

// value, ids
export function applyStyle<T>(data: T): {type: ActionType, data: T} {
	return {
		type: ActionType.ApplyStyle,
		data
	};
}

export function changeTitle<T>(data: T): {type: ActionType, data: T} {
	return {
		type: ActionType.ChangeTitle,
		data
	};
}

export function updateDate(): {type: ActionType} {
	return {
		type: ActionType.UpdateDate
	};
}
