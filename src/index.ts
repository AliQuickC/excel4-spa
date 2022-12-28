import './sass/index.sass';
import {Excel} from './components/excel/Excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';
import {ComponentClass, ColState, State} from './core/types';
import { rootReducer } from './redux/rootReducer';
import { createStore } from './core/createStore';
import { storage } from './core/utils';

const store = createStore(rootReducer, storage('excel-state') || {
	colState: {} as ColState
});

store.subscribe((state: State) => {
	console.log('App State', state);
	storage('excel-state', state);
});

const excel = new Excel('#app', {components: [Header, Toolbar, Formula, Table] as Array<ComponentClass>, store});

excel.render();
