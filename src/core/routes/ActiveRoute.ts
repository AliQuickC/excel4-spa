export class ActiveRoute {
	static get path(): string {	// адресная строка после #
		return window.location.hash.slice(1);
	}

	static get param(): string { // адресная строка после #.../
		return ActiveRoute.path.split('/')[1];
	}

	static navigate(path: string): void { // меняет строку, задает содержимое после #
		window.location.hash = path;
	}
}
