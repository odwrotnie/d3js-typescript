import * as d3 from 'd3';

export class Odds {

  g;
  textSelection;

  currentValue: number;

  constructor(g, value: number, textAnchor: string) {
    this.g = g;
    this.currentValue = value;
    this.textSelection = this.g.append('text').attr('class', 'odds');
    // https://bl.ocks.org/emmasaunders/0016ee0a2cab25a643ee9bd4855d3464
    this.textSelection
      .attr('text-anchor', textAnchor)
      .attr('alignment-baseline', 'hanging')
      .text(this.percentFormat(this.currentValue));
  }

  private percentFormat(value: number) {
    return `${d3.format('.2f')(value)}%`;
  }

  updateValue(value: number, seconds: number = 0.7) {
    const oldValue = this.currentValue;
    this.currentValue = value;
    this.g
      .transition()
      .ease(d3.easeCubic)
      .duration(seconds * 1000)
      .tween('youOdds', () => {
        const i = d3.interpolateNumber(oldValue, this.currentValue);
        return t => {
          this.textSelection.text(this.percentFormat(i(t)));
        };
      }
    );
  }
}
