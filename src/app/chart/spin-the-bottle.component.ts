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
    new Value('Me', 3, 'you'),
    new Value('Others', 5, 'others')
  ];

  width = 1000;
  height = 1000;

  constructor() {
  }

  ngOnInit() {
    const g = this
      .prepareSVG('pie')
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
    console.log({mainG: g})
    const pie = new Pie(g, this.width, this.height, this.data);
    pie.spin(Math.random());
    //pie.startTimePie(10);
  }

  private prepareSVG(id: string) {
    return d3.select(`#${id}`)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'xMidYMid');
  }

  placeBet(value: number) {
    console.log(`Bet placed: ${value}`);
  }

  startTimer() {
    console.log(`Starting timer`);
  }
}
