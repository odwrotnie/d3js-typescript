import * as d3 from 'd3';

import {Value} from './value';
import {BaseType, PieArcDatum} from 'd3';

export class Pie {

  YOU_KEY = 'You';
  POTENTIAL_KEY = 'Potential';
  OTHERS_KEY = 'Others';

  youValue = new Value(this.YOU_KEY, 1, 'you');
  potentialValue = new Value(this.POTENTIAL_KEY, 1, 'potential');
  othersValue = new Value(this.OTHERS_KEY, 1, 'others');

  g: d3.Selection<d3.BaseType, Value, HTMLElement, Value>;
  pie: d3.Pie<any, Value>;
  arc: d3.Arc<any, PieArcDatum<Value>>;
  piePath: d3.Selection<SVGPathElement, PieArcDatum<Value>, BaseType, Value>;

  constructor(g: d3.Selection<d3.BaseType, Value, HTMLElement, Value>, innerRadius: number, outerRadius: number) {

    this.g = g;

    this.arc = d3.arc<PieArcDatum<Value>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    this.pie = d3.pie<Value>().value((d, i, data) => {
      return d.value;
    }).sort(null);

    this.updateValues();
  }

  private dataReady(): d3.PieArcDatum<Value>[] {
    return this.pie(this.valuesList());
  }

  valuesList(): Value[] {
    const list = [this.youValue,
      this.potentialValue,
      this.othersValue];
    console.table(list);
    return list;
  }

  valuesSum() {
    const list: Value[] = this.valuesList();
    return list.reduce((prev, v) => prev + v.value, 0);
  }

  updateValues() {
    this.piePath = this.g.selectAll('arc')
      .data(this.dataReady())
      .enter()
      .append('path');
    this.piePath.attr('d', this.arc)
      .attr('class', (d => {
        return `pie ${d.data.clazz}`;
      }));
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
