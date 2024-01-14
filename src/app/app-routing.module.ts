import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CercaComponent } from './components/cerca/cerca.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { FormsComponent } from './components/forms/forms.component';
import { CommerceStatsComponent } from './components/commerce-stats/commerce-stats.component';

const routes: Routes = [
{
path:'',
loadChildren: () =>
import('../app/components/forms/forms.module')
 .then(m => m.FormsModule)},
{
path:'forms',
component:FormsComponent},
{
path:'cerca',
component:CercaComponent
},
{
path:'dashboard',
component:DashboardComponent
},
{
  path: 'stats',
  component:CommerceStatsComponent},
{
  path:'**',
  component:NotFoundComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
