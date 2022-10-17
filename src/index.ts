import "./sass/index.sass";
import {Excel} from "./components/excel/Excel";
import {Header} from "./components/header/Header";
import {Toolbar} from "./components/toolbar/Toolbar";
import {Formula} from "./components/formula/Formula";
import {Table} from "./components/table/Table";
import {ComponentClass} from "./core/types";


const excel = new Excel("#app", {components: [Header, Toolbar, Formula, Table] as Array<ComponentClass>});
// const excel = new Excel("#app", {components: [Formula]});

excel.render();

