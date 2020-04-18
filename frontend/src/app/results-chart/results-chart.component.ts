import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-results-chart',
  templateUrl: './results-chart.component.html',
  styleUrls: ['./results-chart.component.css']
})
export class ResultsChartComponent {
  @Input() data: string[];
  labels: string[] = [];
  counts: number[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[];
  
  constructor() {}

  ngOnInit(): void {
    this.updateChart();
  }

  updateChart(): void{
    this.labels = this.data.map(e => e[0]);
    this.counts = this.data.map(e => Number(e[1]));

    this.barChartLabels = this.labels

    this.barChartData = [
      { 
        data: this.counts,  
        label: 'Count'
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentData: SimpleChange = changes.data;

    if (currentData.currentValue) {
      this.data = changes.data.currentValue;
      this.updateChart();
    }
   }
}