import './sass/index.sass';

import { Router } from './core/routes/router';
import { DashboardPage } from './page/DashboardPage';
import { ExcelPage } from './page/ExcelPage';

new Router('#app', {
	dashboard: DashboardPage,
	excel: ExcelPage
}
);