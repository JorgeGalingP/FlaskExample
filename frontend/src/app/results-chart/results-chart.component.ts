import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-results-chart',
  templateUrl: './results-chart.component.html',
  styleUrls: ['./results-chart.component.css']
})
export class ResultsChartComponent {

  barChartOptions: ChartOptions = {
    responsive: true
  };
  barChartLabels: Label[] = ['Python', 'Angular', 'Typescript', 'Postgres', 'Redis', 'VSCode', 'SQL', 'MongoDB', 'CSharp', '.NET'];
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { 
      data: [40, 28, 23, 19, 18, 14, 10, 9, 4, 1], 
      label: 'Count'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}