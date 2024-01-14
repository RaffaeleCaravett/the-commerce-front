import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [

  ],
  imports: [
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule

  ],
  providers: [],
  bootstrap: []

})
export class FormsModule { }
