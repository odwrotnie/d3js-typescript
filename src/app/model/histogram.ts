import * as d3 from 'd3';
import {Value} from './value';

export class Histogram {

  histogramG: d3.Selection<d3.BaseType, Value, HTMLElement, Value>;
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number>;

  width: number;
  height: number;

  values: Value[];

  margin = {top: 20, right: 20, bottom: 20, left: 20};

  constructor(g: d3.Selection<d3.BaseType, Value, HTMLElement, Value>, width: number, height: number, values: Value[]) {

    this.histogramG = g.append('g')
      .attr('transform', `translate(${this.margin.left}, ${-this.margin.top})`);
    this.width = width;
    this.height = height;

    this.values = values;

    this.addBottomAxis(values, width, height);
    this.addLeftAxis(values, height);

    this.updateValues();
  }

  private addBottomAxis(values: Value[], width: number, height: number) {
    this.x = d3.scaleBand()
      .range([0, width - this.margin.left - this.margin.right])
      .padding(0.1).round(true);
    this.x.domain(values.map(v => {
      return v.key;
    }));
    this.histogramG
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(this.x));
  }

  private addLeftAxis(values: Value[], height: number) {
    this.y = d3.scaleLinear()
      .range([height, 0]);
    this.y.domain([0, d3.max(values, v => {
      return v.value;
    })]);
    this.histogramG
      .append('g')
      .call(d3.axisLeft(this.y));
  }

  updateValues() {
    console.table(this.values);
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
