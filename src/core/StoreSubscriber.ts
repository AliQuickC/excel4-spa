import { Instance, ReduxUnSubscribe, State, Store } from './types';
import { isEqual } from './utils';

export class StoreSubscriber {
	private store: Store;
	private prevState: State = {} as State;
	private sub: ReduxUnSubscribe | null = null;

	constructor(store: Store) {
		this.store = store;
	}

	public subscribeComponents(components: Instance[]): void { // подписка на изменение state, в компонентах components
		this.prevState = this.store.getState(); // копия state

		this.sub = this.store.subscribe(state => { // добавляем подписку на изменение state
			Object.keys(state).forEach((key) => { // список ключей объекта state (rowState, colState, cellsDataState, currentText и т.д.)
				if (!isEqual(this.prevState[key as keyof State], state[key as keyof State])) { // сравниваем состояние state, предыдущее и сейчас,
					//																					// если есть различия по ключу key
					components.forEach(component => { // перебираем массив объектов
						if (component.isWatching(key)) {	// если ключ key, есть в массиве подписок this.subscribe у компоненты,
							//															// передаваемом(параметр options.subscribe) в конструктор, объекта(компоненты),
							//															// каждый элемент массива, название поля в объекте state
							const changes = {[key as keyof State]: state[key as keyof State]}; // сохраняем новое значение state, для ключа key
							component.storeChanged(changes); // Отображаем в соответствии с новым state, компонент(объект "Типа")
						}
					});
				}
			});
			this.prevState = this.store.getState(); // обновляем состояние предидущего state
		});
	}

	public unsubscribeFromStore(): void {
		this.sub?.unsubscribe();
	}
}
