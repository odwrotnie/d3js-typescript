import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {Value} from './value';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    this.createChart();
  }

  createChart() {

    const data: Value[] = [
      new Value('Win 2x', 15, '#98abc5'),
      new Value('Win 3x', 10, '#8a89a6'),
      new Value('Win 5x', 6, '#7b6888'),
      new Value('Win 30x', 1, '#6b486b')];

    const width = 800;
    const height = 800;
    const outerRadius = Math.min(width, height) / 3;
    const innerRadius = outerRadius / 2;

    const margin = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
    };

    d3.selectAll('#chart svg').remove();

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('perserveAspectRatio', 'xMidYMid')
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const pie = d3.pie().value((d: {key: string, value: Value}): number => {
      console.log('D', d);
      return d.value.value;
    });
    console.log('Pie', pie);

    const dataReady = pie(d3.entries(data));
    console.log('Data ready', dataReady);

    svg
      .selectAll('whatever')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
      )
      .attr('fill', (d: {data: {key: string, value: Value}}): string => {
        console.log('D', d);
        console.log('D.data', d.data.value);
        console.log('D.data.color', d.data.value.color);
        return d.data.value.color;
      });
  }
}
