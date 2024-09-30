import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
	{
		path : '',
		// component : AppComponent,
		children : [
			{
				path : 'status',
				loadChildren : () => import('src/app/modules/healthcheck/healthcheck.module').then(m=>m.HealthcheckModule)
			},
			{
				path : 'config',
				loadChildren: () => import('src/app/modules/config/config.module').then(m=>m.ConfigModule)
			},
			{
				path : 'data',
				loadChildren: () => import('src/app/modules/data/data.module').then(m=> m.DataModule)
			},
			{
				path : 'stores',
				loadChildren : () => import('src/app/modules/stores/stores.module').then(m=>m.StoressModule)
			}
		
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
