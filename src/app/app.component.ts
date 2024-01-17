import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'theCommerce';

  constructor(private app:AppService){}

  ngOnInit(){
this.app.saveVisit().subscribe((data:any)=>{})
  }
}
