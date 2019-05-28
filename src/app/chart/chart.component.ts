import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {Value} from './model/value';
import {Pie} from './model/pie';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

  data: Value[] = [
    new Value('Win 2× / 47%', 15, '#D6A6F1'),
    new Value('Win 3× / 31%', 10, '#992EFB'),
    new Value('Win 5× / 19%', 6, '#7519B5'),
    new Value('Win 30× / 3%', 1, '#E51DE6')
  ];

  width = 1000;
  height = 1000;
  outerRadius = Math.min(this.width, this.height) / 3;
  innerRadius =  this.outerRadius / 2;

  constructor() {
  }

  transformRotate(angle: number): string {
    return `translate(${this.width / 2}, ${this.height / 2}) rotate(${angle})`;
  }

  ngOnInit() {
    const svg = this.prepareSVG('pie');
    const gPie = svg
      .append('g')
      .attr('transform', this.transformRotate(0));
    const gGadgets = svg
      .append('g')
      .attr('transform', this.transformRotate(0));
    const infoG = d3.select(`#info`).style('padding', '1em');
    this.pie(gPie);

    const pie = new Pie(this.data);
    pie.addNeedle(gGadgets);

    infoG.append('text')
      .attr('id', 'state')
      .attr('text-anchor', 'end')
      .attr('alignment-baseline', 'middle')
      .attr('x', 0).attr('y', 0)
      .style('fill', '#a62020')
      .text('?');

    let state = 0;
    const desiredAngle = 290;
    const timeLimit = 3000;
    const t = d3.timer((duration: number) => {

      const angle = duration / 10;
      const angle360 = angle % 360;

      if (state <= 0 && (duration <= timeLimit || angle360 > desiredAngle)) {
        state = 0;
      } else if (state <= 1 && angle360 <= desiredAngle) {
        state = 1;
      } else {
        state = 2;
      }

      console.log('State', state);
      d3.select('#state').text(`S:${state} T:${Math.round(duration)} A:${Math.round(angle360)}`);

      switch (state) {
        case 0:
          gPie.attr('transform', this.transformRotate(angle));
          break;
        case 1:
          gPie.attr('transform', this.transformRotate(angle));
          break;
        case 2:
          gPie.attr('transform', this.transformRotate(desiredAngle));
          t.stop();
          break;
      }

      // g.transition()
      //   .duration(100)
      //   .attr('transform', this.transformRotate(180));

    });
  }

  private prepareSVG(id: string) {
    return d3.select(`#${id}`)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'xMidYMid');

  }

  private pie(g) {
    const pie = d3.pie().value((d: { key: string, value: Value }): number => {
      return d.value.value;
    });
    console.log('Pie', pie);

    const dataReady = pie(d3.entries(this.data));
    console.log('Data ready', dataReady);

    g.selectAll('whatever')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.outerRadius))
      .attr('fill', (d: { data: { key: string, value: Value } }): string => {
        return d.data.value.color;
      });
  }
}
