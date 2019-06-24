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

  svg;
  g;
  pie: Pie;
  width = 1000;
  height = 1000;

  constructor() {

  }

  ngOnInit() {
    this.svg = this
      .prepareSVG('pie');
    this.g = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
    this.pie = new Pie(this.g, this.data);
  }

  private prepareSVG(id: string) {
    return d3.select('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'xMidYMid');
  }

  placeMyBet(count: number) {
    console.log(`Placing my bets: ${count}`);
    this.pie.placeMyBets(count);
  }

  placeOthersBet(count: number) {
    console.log(`Placing others bets: ${count}`);
    this.pie.placeOthersBets(count);
  }

  startTimer(seconds: number) {
    console.log(`Starting timer for ${seconds} seconds`);
    this.pie.startTimer(seconds);
  }

  spinNeedle() {
    this.pie.spin(Math.random());
  }
}
