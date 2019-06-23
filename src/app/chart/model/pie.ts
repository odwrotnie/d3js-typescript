import * as d3 from 'd3';
import {Value} from './value';
import {CurrencyValue} from './currency_value';

export class Pie {

  gPie;
  gTimePie;
  gCircle;
  gNeedle;

  betValue = 3;
  myBetsCount = 2;
  othersBetsCount = 3;

  currencyValue: CurrencyValue;

  scale = 100;
  width = this.scale * 10;
  height = this.scale * 10;
  spinRotations = 5;
  spinSeconds = 5;
  values: Value[];
  valuesSum: number;

  outerRadius = Math.min(this.width, this.height) / 3;
  innerRadius =  this.outerRadius - this.scale;
  needleWidth: number = this.scale / 5;
  needleHeight: number = this.scale / 3;
  needleOffset: number = this.innerRadius + this.scale;
  needlePoints: Array<{x: number, y: number}> = [
    {x: - this.needleWidth, y: - this.needleOffset - this.needleHeight},
    {x: this.needleWidth, y: - this.needleOffset - this.needleHeight},
    {x: 0, y: - this.needleOffset}];

  constructor(g, values: Value[]) {
    // this.width = width;
    // this.height = height;
    this.values = values;
    this.valuesSum = this.values.reduce((prev, v) => prev + v.value, 0);
    this.gCircle = g.append('g');
    this.gPie = g.append('g');
    this.gTimePie = g.append('g');
    this.gNeedle = g.append('g');

    this.addPie();
    this.addNeedle();
    this.addTimePie();

    this.currencyValue = new CurrencyValue(g, 0, '$');
    this.currencyValue.updateValue(1000);

    console.log('Value sum', this.valuesSum);
  }

  placeMyBets(count: number) {
    this.myBetsCount = this.myBetsCount + count;
    this.currencyValue.updateValue(this.gameValue());
  }

  placeOthersBets(count: number) {
    this.othersBetsCount = this.othersBetsCount + count;
    this.currencyValue.updateValue(this.gameValue());
  }

  private betsCount() {
    return this.myBetsCount + this.othersBetsCount;
  }

  private gameValue() {
    return this.betValue * (this.betsCount());
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
      .attr('class', (d: { data: { key: string, value: Value } }): string => {
        return `pie ${d.data.value.clazz}`;
      });
  }

  private addNeedle() {
    this.gNeedle.selectAll('polygon')
      .data([this.needlePoints])
      .enter()
      .append('polygon')
      .attr('class', 'needle')
      .attr('points', (data) => {
        return data.map((d) => {
          return [d.x, d.y].join(', ');
        }).join(' ');
      });
  }

  private arc(endAngle: number) {
    return d3.arc()
      .innerRadius(this.innerRadius * 0.95)
      .outerRadius(this.innerRadius * 0.90)
      .startAngle(0)
      .endAngle(endAngle);
  }

  private addTimePie() {
    // const arc = d3.arc()
    //   .innerRadius(this.innerRadius * 0.95)
    //   .outerRadius(this.innerRadius * 0.90)
    //   .startAngle(0)
    //   .endAngle(2 * Math.PI / 9);
    this.gTimePie.append('path')
      .attr('class', 'pie time')
      .attr('d', this.arc(2 * Math.PI / 9));
  }

  public startTimePie(seconds: number) {

    function rotTween() {
      const angle = d3.interpolate(0, 2 * Math.PI);
      return (t) => {
        return this.arc(angle);
      };
    }

    function arcTween() {
      return d => {
        const angle = d3.interpolate(0, 2 * Math.PI);
        return t => {
          return this.arc(angle);
        };
      };
    }

    this.gTimePie
      .transition()
      .duration(seconds)
      .attrTween('d', arcTween());
  }

  private rotate(angle: number, seconds: number) {
    function rotTween() {
      const i = d3.interpolate(0, angle);
      return (t) => {
        return `rotate(${i(t)},0,0)`;
      };
    }
    this.gNeedle
      .transition()
      .ease(d3.easeCubic)
      .duration(seconds * 1000)
      .attrTween('transform', rotTween);
  }

  addMyValue(value: number) {
    this.currencyValue
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
