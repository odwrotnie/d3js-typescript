import * as d3 from 'd3';
import {Value} from './value';

export class Needle {

  g;
  radius: number;
  needleWidth: number;
  needleHeight: number;
  needlePoints: Array<{x: number, y: number}>;

  values: Value[];
  valuesSum: number;

  spinRotations = 5;
  spinSeconds = 5;

  constructor(g, radius: number, values: Value[]) {
    this.g = g.append('g');
    this.radius = radius;
    this.needleWidth = this.radius / 13;
    this.needleHeight = this.radius / 10;
    this.needlePoints = [
      {x: - this.needleWidth, y: - this.radius - this.needleHeight},
      {x: this.needleWidth, y: - this.radius - this.needleHeight},
      {x: 0, y: - this.radius}];
    this.g.selectAll('polygon')
      .data([this.needlePoints])
      .enter()
      .append('polygon')
      .attr('class', 'needle')
      .attr('points', (data) => {
        return data.map((d) => {
          return [d.x, d.y].join(', ');
        }).join(' ');
      });
    this.values = values;
    this.valuesSum = values.reduce((prev, v) => prev + v.value, 0);
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

  private rotate(angle: number, seconds: number) {
    const i = d3.interpolate(0, angle);
    function rotTween() {
      return (t) => {
        return `rotate(${i(t)},0,0)`;
      };
    }
    this.g
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
    this.rotate(anglePlusRotation, this.spinSeconds);
  }
}
