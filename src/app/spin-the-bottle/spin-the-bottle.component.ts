import * as d3 from 'd3';

import {Component, OnInit} from '@angular/core';
import {SpinTheBottle} from '../model/spin-the-bottle';

@Component({
  selector: 'app-spin-the-bottle',
  templateUrl: './spin-the-bottle.component.html',
  styleUrls: ['./spin-the-bottle.component.sass']
})
export class SpinTheBottleComponent implements OnInit {

  svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  g: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  spinTheBottle: SpinTheBottle;
  width = 1000;
  height = 1000;

  constructor() {

  }

  ngOnInit() {
    this.svg = this
      .prepareSVG('spin-the-bottle');
    this.g = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
    this.spinTheBottle = new SpinTheBottle(this.g);
  }

  private prepareSVG(id: string) {
    return d3.select(`svg#${id}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'xMidYMid');
  }

  placeMyBet(count: number) {
    console.log(`Placing my bets: ${count}`);
    this.spinTheBottle.placeYouBets(count);
  }

  placeOthersBet(count: number) {
    console.log(`Placing others bets: ${count}`);
    this.spinTheBottle.placeOthersBets(count);
  }

  startTimer(seconds: number) {
    console.log(`Starting timer for ${seconds} seconds`);
    this.spinTheBottle.startTimer(seconds);
  }

  spinNeedle() {
    this.spinTheBottle.spin(Math.random());
  }
}