import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {Value} from './value';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

  data: Value[] = [
    new Value('Win 2× / 47%', 15, '#98abc5'),
    new Value('Win 3× / 31%', 10, '#8a89a6'),
    new Value('Win 5× / 19%', 6, '#7b6888'),
    new Value('Win 30× / 3%', 1, '#6b486b')
  ];

  width = 100;
  height = 100;
  outerRadius = Math.min(this.width, this.height) / 3;
  innerRadius =  this.outerRadius / 2;

  constructor() {
  }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const g = this.prepareG('chart');
    this.pie(g);
  }

  private prepareG(id: string) {
    d3.selectAll(`#${id} svg`).remove();
    return d3.select(`#${id}`)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'xMidYMid')
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private pie(g) {
    const pie = d3.pie().value((d: { key: string, value: Value }): number => {
      return d.value.value;
    });
    console.log('Pie', pie);

    const dataReady = pie(d3.entries(this.data));
    console.log('Data ready', dataReady);

    g.selectAll('whatever')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.outerRadius)
      )
      .attr('fill', (d: { data: { key: string, value: Value } }): string => {
        return d.data.value.color;
      });
  }
}
