import * as d3 from 'd3';

export class TimePie {

  g;
  radius: number;
  arc;
  path;

  constructor(g, radius: number) {
    this.g = g;
    this.radius = radius;
    this.arc = d3.arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius)
      .startAngle(0);
    this.path = this.g.append('path')
      .attr('class', 'pie time')
      .datum({endAngle: 2 * Math.PI})
      .attr('d', this.arc);
  }

  public startTimer(seconds: number) {

    const self = this;
    const i = d3.interpolate(2 * Math.PI, 0);

    function arcTween() {
      return (d) => {
        return (t) => {
          d.endAngle = i(t);
          return self.arc(d);
        };
      };
    }

    this.path
      .transition()
      .ease(d3.easeLinear)
      .duration(seconds * 1000)
      .attrTween('d', arcTween());
  }
}
