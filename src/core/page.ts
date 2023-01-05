/* eslint-disable @typescript-eslint/no-empty-function */
import { DomInstance } from './dom';

export abstract class Page {
	protected params: string;

	constructor(params: string) {
		this.params = params;
	}

	abstract getRoot(): DomInstance;

	public afterRender() {}
	public destroy() {}
}
