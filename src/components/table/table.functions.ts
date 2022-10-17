export function shouldResize(event: Event) {
	return (<HTMLElement>event.target).dataset.resize; // дата атрибут data-resize
}