import * as d3 from 'd3';

export class Text {

  gText;

  constructor(g, text: string) {
    this.gText = g.append('g').attr('id', 'text');
    this.setText(text);
  }

  setText(text: string) {
    this.gText
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(text);
  }

  updateText(text: string) {
    this.gText
      .select('text')
      .transition()
      .duration(1000)
      .tween('text', () => {
        const that = this.gText.select('text');
        console.log('that', that);
        const i = d3.interpolateNumber(0, Math.random() * 1000);
        return t => {
          that.text(t);
        };
      }
    );
  }
}
