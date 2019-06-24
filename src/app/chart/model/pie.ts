import * as d3 from 'd3';
import {Value} from './value';
import {CurrencyValue} from './currency_value';
import {TimePie} from './time-pie';
import {Needle} from './needle';
import {Odds} from './odds';

export class Pie {

  g;

  betValue = 3;
  myBetsCount = 0;
  othersBetsCount = 0;

  needle: Needle;
  timePie: TimePie;
  currencyValue: CurrencyValue;
  odds: Odds;

  scale = 100;
  width = this.scale * 10;
  height = this.scale * 10;
  values: Value[];

  outerRadius = Math.min(this.width, this.height) / 3;
  innerRadius =  this.outerRadius - this.scale;

  constructor(g, values: Value[]) {

    this.g = g.append('g');

    this.values = values;

    const pie = d3.pie().value((d: { key: string, value: Value }): number => {
      return d.value.value;
    }).sort(null);
    const dataReady = pie(d3.entries(this.values));
    this.g.selectAll('whatever')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.outerRadius))
      .attr('class', (d: { data: { key: string, value: Value } }): string => {
        return `pie ${d.data.value.clazz}`;
      });

    this.needle = new Needle(g, this.outerRadius, this.values);
    this.timePie = new TimePie(g, this.innerRadius);
    this.currencyValue = new CurrencyValue(g, 0, '$');
    this.odds = new Odds(g, 12);
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

  spin(random: number) {
    this.needle.spin(random);
  }

  startTimer(seconds: number) {
    this.timePie.startTimer(seconds);
  }
}
