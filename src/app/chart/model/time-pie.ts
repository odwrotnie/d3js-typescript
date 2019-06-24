import * as d3 from 'd3';

export class TimePie {

  g;
  radius: number;
  arc;
  path;

  constructor(g, radius: number) {
    this.g = g.append('g');
    this.radius = radius;
    this.arc = d3.arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius)
      .startAngle(0);
    this.path = this.g.append('path')
      .attr('class', 'pie time')
      .datum({endAngle: 3})
      .attr('d', this.arc);
  }

  public startTimer(seconds: number) {

    const self = this;

    function arcTween(newAngle) {
      return (d) => {
        const i = d3.interpolate(0, newAngle);
        return (t) => {
          d.endAngle = i(t);
          console.log('t', t, i(t), d);
          return self.arc(d);
        };
      };
    }

    this.path
      .transition()
      .duration(10000)
      .attrTween('d', arcTween(2 * Math.PI));
  }
}
