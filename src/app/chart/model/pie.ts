import * as d3 from 'd3';
import {Value} from './value';

export class Pie {

  gPie;
  gNeedle;
  gDebug;

  width = 1000;
  height = 1000;
  values: Value[];

  outerRadius = Math.min(this.width, this.height) / 3;
  innerRadius =  this.outerRadius / 2;
  needleWidth: number = this.innerRadius / 5;
  needleOffset: number = this.innerRadius / 2;
  needlePoints: Array<{x: number, y: number}> = [
    {x: - this.needleWidth, y: - this.outerRadius - this.needleOffset},
    {x: this.needleWidth, y: - this.outerRadius - this.needleOffset},
    {x: 0, y: - this.innerRadius - this.needleOffset}];

  constructor(width: number, height: number, values: Value[]) {
    this.width = width;
    this.height = height;
    this.values = values;
  }

  addDebug(g) {
    this.gDebug = g;
    this.gDebug.append('text')
      .attr('id', 'state')
      .attr('text-anchor', 'end')
      .attr('alignment-baseline', 'middle')
      .attr('x', 0).attr('y', 0)
      .style('fill', '#a62020')
      .text('DEBUG');
  }

  getDebug() {
    return d3.select('#state');
  }

  addNeedle(g) {
    this.gNeedle = g;
    this.gNeedle.selectAll('polygon')
      .data([this.needlePoints])
      .enter()
      .append('polygon')
      .style('fill', '#ffffff')
      .attr('points', (data) => {
        return data.map((d) => {
          const t = [d.x, d.y].join(',');
          console.log('T', t);
          return t;
        }).join(' ');
      });
  }

  addPie(g) {
    this.gPie = g;
    const pie = d3.pie().value((d: { key: string, value: Value }): number => {
      return d.value.value;
    });
    console.log('Pie', pie);

    const dataReady = pie(d3.entries(this.values));
    console.log('Data ready', dataReady);

    this.gPie.selectAll('whatever')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.outerRadius))
      .attr('fill', (d: { data: { key: string, value: Value } }): string => {
        return d.data.value.color;
      });
  }

  rotate(angle: number) {
    this.gPie.attr('transform', `rotate(${angle})`);
  }
}