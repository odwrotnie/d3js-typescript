import * as d3 from 'd3';
import {Value} from './value';

export class Pie {

  gPie;
  gNeedle;

  width = 1000;
  height = 1000;
  values: Value[];

  outerRadius = Math.min(this.width, this.height) / 3;
  innerRadius =  this.outerRadius / 2;
  needleWidth: number = this.innerRadius / 5;
  needleOffset: number = this.innerRadius / 5;
  needlePoints: Array<{x: number, y: number}> = [
    {x: - this.needleWidth, y: - this.outerRadius - this.needleOffset},
    {x: this.needleWidth, y: - this.outerRadius - this.needleOffset},
    {x: 0, y: - this.innerRadius - this.needleOffset}];

  constructor(width: number, height: number, values: Value[]) {
    this.width = width;
    this.height = height;
    this.values = values;
  }

  addNeedle(g) {
    this.gNeedle = g;
    this.gNeedle.selectAll('polygon')
      .data([this.needlePoints])
      .enter()
      .append('polygon')
      .style('fill', 'rgba(0,0,0,0.5)')
      .attr('points', (data) => {
        return data.map((d) => {
          return [d.x, d.y].join(', ');
        }).join(' ');
      });
  }

  addPie(g) {
    this.gPie = g;
    const pie = d3.pie().value((d: { key: string, value: Value }): number => {
      return d.value.value;
    });
    const dataReady = pie(d3.entries(this.values));
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

  rotate(angle: number, seconds: number) {
    function rotTween() {
      const i = d3.interpolate(0, angle);
      return (t) => {
        return `rotate(${i(t)},0,0)`;
      };
    }
    this.gPie
      .transition()
      .ease(d3.easeCubic)
      .duration(seconds * 1000)
      .attrTween('transform', rotTween);
  }
}
