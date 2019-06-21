import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {Value} from './model/value';
import {Pie} from './model/pie';

@Component({
  selector: 'app-chart',
  templateUrl: './spin-the-bottle.component.html',
  styleUrls: ['./spin-the-bottle.component.sass']
})
export class SpinTheBottleComponent implements OnInit {

  data: Value[] = [
    new Value('Me', 3, '#E51DE6'),
    new Value('Others', 5, '#7519B5')
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
    const pie = new Pie(g, this.width, this.height, this.data);
    pie.spin(Math.random());
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
