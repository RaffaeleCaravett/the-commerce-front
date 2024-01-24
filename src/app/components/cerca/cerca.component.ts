import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CercaService } from 'src/app/services/cerca.service';

@Component({
  selector: 'app-cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.scss']
})
export class CercaComponent implements OnInit{
  private sub: any;
param:string = ''
prodotti:any[]=[]
  constructor(private route: ActivatedRoute,private cercaService:CercaService,private toastr:ToastrService){}


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.param = params['param'];


this.cercaService.getProductByNomeContaining(this.param).subscribe((prodotti:any)=>{
  this.prodotti=prodotti
  console.log(prodotti)
},err=>{
  this.toastr.error(err.error.message||'Qualcosa è andato storto nell\'elaborazione della richiesta')
})
    })
    }
}
