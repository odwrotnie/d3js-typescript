import * as d3 from 'd3';
import {Value} from './value';

export class Histogram {

  g;
  histogramG;
  x;
  y;

  width: number;
  height: number;

  values: Value[];

  margin = {top: 20, right: 20, bottom: 30, left: 40};

  constructor(g, width: number, height: number, values: Value[]) {

    this.g = g;
    this.histogramG = g.append('g')
      .attr('transform', `translate(${this.margin.left}, ${-this.margin.top})`);
    this.width = width;
    this.height = height;

    this.values = values;

    this.x = d3.scaleBand().range([0, width - this.margin.left - this.margin.right]).padding(0.1).round(true);
    this.x.domain(values.map(v => {
      return v.key;
    }));

    this.y = d3.scaleLinear().range([height, 0]);
    this.y.domain([0, d3.max(values, v => {
      return v.value;
    })]);

    this.histogramG.append('g')
      .attr('transform', `translate(0, ${height - this.margin.bottom})`)
      .call(d3.axisBottom(this.x));
    this.histogramG.append('g')
      .attr('transform', `translate(0, ${-this.margin.bottom})`)
      .call(d3.axisLeft(this.y));

    this.updateValues();
  }

  updateValues() {
    this.histogramG.selectAll('bar')
      .data(this.values)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.x(d.key))
      .attr('width', this.x.bandwidth())
      .attr('y', d => this.y(d.value))
      .attr('height', d => this.height - this.y(d.value));
  }

  // addYouOdds(count: number) {
  //   this.youValue.addToValue(count);
  //   this.updateValues();
  // }
  //
  // addOthersOdds(count: number) {
  //   this.othersValue.addToValue(count);
  //   this.updateValues();
  // }
}
