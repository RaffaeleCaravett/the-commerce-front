import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
ReactiveFormsModule,
RouterModule.forChild([
  { path: '', component: DashboardComponent }
]),
MatDialogModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]

})
export class DashboardModule { }
