import * as d3 from 'd3';
import {Value} from './value';
import {GameValue} from './game_value';
import {TimePie} from './time-pie';
import {Needle} from './needle';
import {Odds} from './odds';

export class Pie {

  g;

  values: Value[];

  constructor(g, values: Value[], innerRadius: number, outerRadius: number) {

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
        .innerRadius(innerRadius)
        .outerRadius(outerRadius))
      .attr('class', (d: { data: { key: string, value: Value } }): string => {
        return `pie ${d.data.value.clazz}`;
      });
  }
}
