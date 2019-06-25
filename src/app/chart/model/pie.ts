import * as d3 from 'd3';
import {Value} from './value';

export class Pie {

  g;
  pie;
  arc;
  piePath;

  values: Value[] = [
    new Value('You', 3, 'you'),
    new Value('Potential', 1, 'potential'),
    new Value('Others', 5, 'others')
  ];

  constructor(g, innerRadius: number, outerRadius: number) {

    this.g = g;

    this.arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    this.pie = d3.pie().value((d: { key: string, value: Value }): number => {
      return d.value.value;
    }).sort(null);

    this.setValues(this.values);
  }

  private dataReady() {
    return this.pie(d3.entries(this.values));
  }

  valuesSum() {
    return this.values.reduce((prev, v) => prev + v.value, 0);
  }

  setValues(values: Value[]) {
    this.values = values;
    this.piePath = this.g.selectAll('whatever')
      .data(this.dataReady())
      .enter()
      .append('path');
    this.piePath.attr('d', this.arc)
      .attr('class', (d: { data: { key: string, value: Value } }): string => {
        return `pie ${d.data.value.clazz}`;
      });
  }

  updateValues(values: Value[]) {
    this.setValues(values);
  }
}
