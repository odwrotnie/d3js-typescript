import * as d3 from 'd3';
import {Value} from './value';

export class Pie {

  YOU_KEY = 'You';
  POTENTIAL_KEY = 'Potential';
  OTHERS_KEY = 'Others';

  youValue = new Value(this.YOU_KEY, 0, 'you');
  potentialValue = new Value(this.POTENTIAL_KEY, 0, 'potential');
  othersValue = new Value(this.OTHERS_KEY, 0, 'others');

  g;
  pie;
  arc;
  piePath;

  constructor(g, innerRadius: number, outerRadius: number) {

    this.g = g;

    this.arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    this.pie = d3.pie().value((d: { key: string, value: Value }): number => {
      return d.value.value;
    }).sort(null);

    this.updateValues();
  }

  private dataReady() {
    return this.pie(d3.entries(this.valuesList()));
  }

  valuesList(): Value[] {
    return [this.youValue,
      this.potentialValue,
      this.othersValue];
  }

  valuesSum() {
    const list: Value[] = this.valuesList();
    return list.reduce((prev, v) => prev + v.value, 0);
  }

  updateValues() {
    this.piePath = this.g.selectAll('whatever')
      .data(this.dataReady())
      .enter()
      .append('path');
    this.piePath.attr('d', this.arc)
      .attr('class', (d: { data: { key: string, value: Value } }): string => {
        return `pie ${d.data.value.clazz}`;
      });
  }

  addYouOdds(count: number) {
    this.youValue.addToValue(count);
    this.updateValues();
  }

  addOthersOdds(count: number) {
    this.othersValue.addToValue(count);
    this.updateValues();
  }
}
