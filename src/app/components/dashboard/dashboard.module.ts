import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
