import * as d3 from 'd3';
import {Value} from './value';
import {forEach} from '@angular/router/src/utils/collection';

export class Pie {

  gPie;
  gCircle;
  gNeedle;

  width = 1000;
  height = 1000;
  spinRotations = 5;
  spinSeconds = 5;
  values: Value[];
  valuesSum: number;

  outerRadius = Math.min(this.width, this.height) / 3;
  innerRadius =  this.outerRadius / 2;
  needleWidth: number = this.innerRadius / 5;
  needleOffset: number = this.innerRadius / 5;
  needlePoints: Array<{x: number, y: number}> = [
    {x: - this.needleWidth, y: - this.outerRadius - this.needleOffset},
    {x: this.needleWidth, y: - this.outerRadius - this.needleOffset},
    {x: 0, y: - this.innerRadius - this.needleOffset}];

  constructor(g, width: number, height: number, values: Value[]) {
    this.width = width;
    this.height = height;
    this.values = values;
    this.valuesSum = this.values.reduce((prev, v) => prev + v.value, 0);
    this.gCircle = g.append('g');
    this.gPie = g.append('g');
    this.gNeedle = g.append('g');
    this.addPie();
    this.addNeedle();
    console.log('Value sum', this.valuesSum);
  }

  private valueBasedOnNumber(random: number): Value {
    if (random >= 1) { throw new Error(`Random number (${random}) should be < 1`); }
    if (random < 0) { throw new Error(`Random number (${random}) should be >= 0`); }

    const treshold = this.valuesSum * random;
    console.log('Treshold', treshold);

    const res: {v: Value, sum: number} = this.values.reduce((x, value) => {
      const newSum = x.sum + value.value;
      if (treshold >= newSum) {
        return {v: null, sum: newSum};
      } else if (x.v) {
        return {v: x.v, sum: newSum};
      } else {
        return {v: value, sum: newSum};
      }
    }, {v: null, sum: 0});

    return res.v;
  }

  private addPie() {
    const pie = d3.pie().value((d: { key: string, value: Value }): number => {
      return d.value.value;
    }).sort(null);
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

  private addCircle(color: string, seconds: number) {
    this.gCircle.append('circle')
      .transition()
      .ease(d3.easeCubic)
      .duration(seconds * 1000)
      .transition()
      .ease(d3.easeCubic)
      .duration(300)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', this.outerRadius)
      .attr('fill', color);
  }

  private addNeedle() {
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

  private rotate(angle: number, seconds: number) {
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

  spin(random: number) {
    const value = this.valueBasedOnNumber(random);
    const angle = random * 360;
    const anglePlusRotation = 360 * this.spinRotations + angle;
    console.log('Random number', random);
    console.log('Random value', value);
    console.log('Angle', angle);
    this.rotate(-anglePlusRotation, this.spinSeconds);
    this.addCircle(value.color, this.spinSeconds);
  }
}
