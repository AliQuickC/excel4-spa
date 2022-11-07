// формирует имя события, делает верхний регистр для первой буквы
export function capitalize(string: string): string {
	if (typeof string !== "string") {
		return "";
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start: number, end: number): number[] {
	if (start > end) {
		[end, start] = [start, end];
	}
	return new Array(end - start + 1)
		.fill("")
		.map((_: unknown, index: number) => start + index);
}
