import * as d3 from 'd3';

export class Odds {

  g;
  textSelection;

  currentValue: number;

  constructor(g, value: number) {
    this.g = g.append('g');
    this.currentValue = value;
    this.textSelection = this.g.append('text');
    this.textSelection
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(Odds.percentFormat(this.currentValue));
  }

  private static percentFormat(value: number) {
    return `${d3.format('.2f')(value)}%`;
  }

  updateValue(value: number) {
    const oldValue = this.currentValue;
    this.currentValue = value;
    this.g
      .transition()
      .ease(d3.easeCubic)
      .duration(700)
      .tween('currency_value', () => {
        const i = d3.interpolateNumber(oldValue, this.currentValue);
        return t => {
          this.textSelection.text(Odds.percentFormat(this.currentValue));
        };
      }
    );
  }
}
