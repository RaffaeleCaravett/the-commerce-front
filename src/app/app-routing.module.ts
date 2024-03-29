import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CercaComponent } from './components/cerca/cerca.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { FormsComponent } from './components/forms/forms.component';
import { CommerceStatsComponent } from './components/commerce-stats/commerce-stats.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/guard/auth.guard';

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
path:'cerca/:param',
component:CercaComponent
},
{
path:'dashboard',
loadChildren: () =>
import('../app/components/dashboard/dashboard.module')
 .then(m => m.DashboardModule ), canActivate:[AuthGuard]
},
{
  path:'dinamic/:id',
  loadChildren: () =>
  import('../app/components/dinamic-category/dinamic-category.module')
   .then(m => m.DinamicCategoryModule)
  },
  {
    path: 'home',
    component:HomeComponent},
{
  path: 'stats',
  component:CommerceStatsComponent , canActivate:[AuthGuard]},
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
