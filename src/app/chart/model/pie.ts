import {Value} from './value';

export class Pie {

  width = 1000;
  height = 1000;
  outerRadius = Math.min(this.width, this.height) / 3;
  innerRadius =  this.outerRadius / 2;
  values: Value[];

  constructor(values: Value[]) {
    this.values = values;
  }

  addNeedle(g) {
    const needleWidth: number = this.innerRadius / 5;
    const needleOffset: number = this.innerRadius / 2;
    const needlePoints: Array<{x: number, y: number}> = [{x: - needleWidth, y: - this.outerRadius - needleOffset},
      {x: needleWidth, y: - this.outerRadius - needleOffset},
      {x: 0, y: - this.innerRadius - needleOffset}];

    g.selectAll('polygon')
      .data([needlePoints])
      .enter()
      .append('polygon')
      .style('fill', '#ffffff')
      .attr('points', (data) => {
        return data.map((d) => {
          const t = [d.x, d.y].join(',');
          console.log('T', t);
          return t;
        }).join(' ');
      });
  }
}
