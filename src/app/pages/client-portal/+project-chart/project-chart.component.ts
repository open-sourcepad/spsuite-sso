import { Component, AfterViewInit } from '@angular/core';
import { CpService } from '../../../services/api/cp.service';

declare var Chart: any;

@Component({
  selector: 'project-chart',
  templateUrl: './project-chart.component.pug',
  styleUrls: ['./project-chart.component.scss']
})
export class ProjectChartComponent implements AfterViewInit {

  chartElement;
  chartData;
  chart;

  constructor(private cpService: CpService) { }

  ngAfterViewInit() {
    this.initChart();
  }

  initChart() {
    this.chartElement= document.getElementById("myChart");
    this.chartData = this.cpService.chartData();
    this.chart = new Chart(this.chartElement, {
      type: 'pie',
      data: this.cpService.chartData(),
      options: this.cpService.chartOptions()})
  }

}
