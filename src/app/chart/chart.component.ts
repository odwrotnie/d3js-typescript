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

    const width = 800;
    const height = 800;

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

    const circle = svg.append('circle')
      .attr('cx', 30)
      .attr('cy', 30)
      .attr('r', 20);

    // const radius = Math.min(width, height) / 2 - margin.left;
    //
    // const data: Value[] = [new Value('a', 10), new Value('b', 20), new Value('c', 30)];
    //
    // // set the color scale
    // const color = d3.scaleOrdinal()
    //   .domain(data)
    //   .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56']);
    //
    // // Compute the position of each group on the pie:
    // const pie = d3.pie().value((d: Value): number => d.value);
    // const dataReady = pie(d3.entries(data));
    //
    // // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    // svg
    //   .selectAll('whatever')
    //   .data(dataReady)
    //   .enter()
    //   .append('path')
    //   .attr('d', d3.arc()
    //     .innerRadius(0)
    //     .outerRadius(radius)
    //   )
    //   .attr('fill', d => (color(d.data.key)));
  }
}
