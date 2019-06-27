import * as d3 from 'd3';

import { Component, OnInit } from '@angular/core';
import {Histogram} from '../model/histogram';
import {Value} from '../model/value';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent implements OnInit {

  svg;
  g;

  histogram: Histogram;
  width = 1000;
  height = 500;

  constructor() {

  }

  values: Value[] = [
    new Value('Andrzej', 3, 'v'),
    new Value('Beatka', 5, 'v'),
    new Value('Czarek', 8, 'v'),
    new Value('D', 7, 'v'),
    new Value('E', 9, 'v'),
    new Value('F', 1, 'v'),
    new Value('G', 2, 'v'),
    new Value('H', 7, 'v'),
    new Value('I', 5, 'v'),
    new Value('J', 9, 'v'),
    new Value('K', 2, 'v'),
    new Value('L', 3, 'v'),
    new Value('M', 5, 'v')
  ];

  ngOnInit() {
    this.svg = this
      .prepareSVG('histogram');
    this.g = this.svg
      .append('g');
    this.histogram = new Histogram(this.g, this.width, this.height, this.values);
  }

  private prepareSVG(id: string) {
    return d3.select(`svg#${id}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'xMidYMid');
  }
}
