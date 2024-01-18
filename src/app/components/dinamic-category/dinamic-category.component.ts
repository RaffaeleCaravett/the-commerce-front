import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dinamic-category',
  templateUrl: './dinamic-category.component.html',
  styleUrls: ['./dinamic-category.component.scss']
})
export class DinamicCategoryComponent implements OnInit, OnDestroy{
  id: number=0;
  private sub: any;
category:any
  constructor(private route: ActivatedRoute,private appService:AppService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
this.appService.getCategoryById(this.id).subscribe((data:any)=>{
this.category=data})
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
