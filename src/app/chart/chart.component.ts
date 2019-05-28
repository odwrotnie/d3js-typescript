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

  ngOnInit() {
    const g = this
      .prepareSVG('pie')
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
    const gPie = g
      .append('g');
    const gGadgets = g
      .append('g');
    const infoG = d3.select(`#info`).style('padding', '1em');

    const pie = new Pie(this.width, this.height, this.data);
    pie.addPie(gPie);
    pie.addNeedle(gGadgets);
    pie.addDebug(infoG);

    pie.rotate(1000, 3);

    // let state = 0;
    // const desiredAngle = 290;
    // const timeLimit = 3000;
    // const t = d3.timer((duration: number) => {
    //
    //   const angle = duration / 10;
    //   const angle360 = angle % 360;
    //
    //   if (state <= 0 && (duration <= timeLimit || angle360 > desiredAngle)) {
    //     state = 0;
    //   } else if (state <= 1 && angle360 <= desiredAngle) {
    //     state = 1;
    //   } else {
    //     state = 2;
    //   }
    //
    //   console.log('State', state);
    //   pie.getDebug().text(`S:${state} T:${Math.round(duration)} A:${Math.round(angle360)}`);
    //
    //   switch (state) {
    //     case 0:
    //       gPie.attr('transform', this.transformRotate(angle));
    //       break;
    //     case 1:
    //       gPie.attr('transform', this.transformRotate(angle));
    //       break;
    //     case 2:
    //       gPie.attr('transform', this.transformRotate(desiredAngle));
    //       t.stop();
    //       break;
    //   }
    //
    //   // g.transition()
    //   //   .duration(100)
    //   //   .attr('transform', this.transformRotate(180));
    //
    // });
  }

  private prepareSVG(id: string) {
    return d3.select(`#${id}`)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'xMidYMid');

  }
}
