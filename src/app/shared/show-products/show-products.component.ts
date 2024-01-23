import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent {


  constructor(private dialogRef: MatDialogRef<ShowProductsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }


  closeDialog(param?:any): void {
    this.dialogRef.close(param||null);
  }


}
