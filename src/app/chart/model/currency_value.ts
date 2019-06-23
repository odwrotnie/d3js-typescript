import * as d3 from 'd3';

export class CurrencyValue {

  g;
  currentValue: number;
  currency: string;

  constructor(g, value: number, currency: string) {
    this.g = g.append('g');
    this.currentValue = value;
    this.currency = currency;
    this.g
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(CurrencyValue.valueFormat(this.currentValue, this.currency));
  }

  private static valueFormat(value: number, currency: string) {
    return `${currency}${d3.format('.2f')(value)}`;
  }

  updateValue(value: number) {
    const oldValue = this.currentValue;
    this.currentValue = value;
    this.g
      .transition()
      .ease(d3.easeCubic)
      .duration(700)
      .tween('currency_value', () => {
        const that = this.g.select('text');
        const i = d3.interpolateNumber(oldValue, this.currentValue);
        return t => {
          that.text(CurrencyValue.valueFormat(i(t), this.currency));
        };
      }
    );
  }
}
