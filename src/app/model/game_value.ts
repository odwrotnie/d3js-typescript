import * as d3 from 'd3';

export class GameValue {

  g;
  textSelection;
  currentValue: number;
  currency: string;

  constructor(g, value: number, currency: string) {
    this.g = g;
    this.currentValue = value;
    this.currency = currency;
    this.textSelection = this.g.append('text').attr('class', 'game-value');
    this.textSelection
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(GameValue.valueFormat(this.currentValue, this.currency));
  }

  private static valueFormat(value: number, currency: string) {
    return `${currency}${d3.format('.2f')(value)}`;
  }

  updateValue(value: number, seconds: number = 0.7) {
    const oldValue = this.currentValue;
    this.currentValue = value;
    this.g
      .transition()
      .ease(d3.easeCubic)
      .duration(seconds * 1000)
      .tween('currency_value', () => {
        const i = d3.interpolateNumber(oldValue, this.currentValue);
        return t => {
          this.textSelection.text(GameValue.valueFormat(i(t), this.currency));
        };
      }
    );
  }
}