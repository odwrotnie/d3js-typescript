import * as d3 from 'd3';

export class TimePie {

  g;
  radius: number;

  constructor(g, radius: number) {
    this.g = g.append('g');
    this.radius = radius;
    this.g.append('path')
      .attr('class', 'pie time')
      .attr('d', this.arc(2 * Math.PI / 9));
  }

  private arc(endAngle: number) {
    return d3.arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius * 1.1)
      .startAngle(0)
      .endAngle(endAngle);
  }
}
