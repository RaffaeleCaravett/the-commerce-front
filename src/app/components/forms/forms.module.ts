import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FormsComponent } from './forms.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
FormsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule

  ],
  providers: [FormsComponent],
  bootstrap: []

})
export class FormsModule { }
