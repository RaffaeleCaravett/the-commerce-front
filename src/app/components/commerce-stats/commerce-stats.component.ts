import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commerce-stats',
  templateUrl: './commerce-stats.component.html',
  styleUrls: ['./commerce-stats.component.scss']
})
export class CommerceStatsComponent implements OnInit{

  chartOptions: any


  ngOnInit(): void {
    this.chartOptions = {
      // Your ECharts configuration goes here
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }]
    };
 }

}
