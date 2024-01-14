import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DinamicCategoryComponent } from './dinamic-category.component';

@NgModule({
  declarations: [
    DinamicCategoryComponent,
  ],
  imports: [
    CommonModule,
RouterModule.forChild([
  { path: '', component: DinamicCategoryComponent }
])
  ],
  providers: [],
  bootstrap: [],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]

})
export class DinamicCategoryModule { }
