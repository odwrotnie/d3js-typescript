import * as d3 from 'd3';
import {Pie} from './pie';
import {Value} from './value';
import {Odds} from './odds';
import {Needle} from './needle';
import {TimePie} from './time-pie';
import {GameValue} from './game_value';

export class SpinTheBottle {

  g;

  pie: Pie;
  needle: Needle;
  timePie: TimePie;
  gameValue: GameValue;

  gYouOdds;
  youOdds: Odds;
  gOthersOdds;
  othersOdds: Odds;

  scale = 100;
  betValue = 3;
  youBetsCount = 0;
  othersBetsCount = 0;

  width = this.scale * 10;
  height = this.scale * 10;
  outerRadius = Math.min(this.width, this.height) / 3;
  innerRadius =  this.outerRadius - this.scale;

  data: Value[] = [
    new Value('Me', 3, 'you'),
    new Value('Others', 5, 'others')
  ];

  constructor(g) {
    this.g = g;
    this.pie = new Pie(g, this.data, this.innerRadius, this.outerRadius);

    this.needle = new Needle(g, this.outerRadius, this.data);
    this.timePie = new TimePie(g, this.innerRadius);
    this.gameValue = new GameValue(g, 0, '$');

    this.gYouOdds = g.append('g')
      .attr('class', 'you')
      .attr('transform', `translate(${this.outerRadius}, ${-this.outerRadius})`);
    this.youOdds = new Odds(this.gYouOdds,
      0,
      'end');
    this.gOthersOdds = g.append('g')
      .attr('class', 'others')
      .attr('transform', `translate(${-this.outerRadius}, ${-this.outerRadius})`);
    this.othersOdds = new Odds(this.gOthersOdds,
      0,
      'start');
  }

  private betsCount() {
    return this.youBetsCount + this.othersBetsCount;
  }

  private betsValue() {
    return this.betValue * (this.betsCount());
  }

  placeYouBets(count: number) {
    this.youBetsCount = this.youBetsCount + count;
    console.log('Place you bets', this.youBetsCount, 'all', this.betsCount());
    this.gameValue.updateValue(this.betsValue());
    this.youOdds.updateValue(100 * this.youBetsCount / this.betsCount());
    this.othersOdds.updateValue(100 * this.othersBetsCount / this.betsCount());
  }

  placeOthersBets(count: number) {
    this.othersBetsCount = this.othersBetsCount + count;
    console.log('Place other bets', this.othersBetsCount, 'all', this.betsCount());
    this.gameValue.updateValue(this.betsValue());
    this.youOdds.updateValue(100 * this.youBetsCount / this.betsCount());
    this.othersOdds.updateValue(100 * this.othersBetsCount / this.betsCount());
  }

  spin(random: number) {
    this.needle.spin(random);
  }

  startTimer(seconds: number) {
    this.timePie.startTimer(seconds);
  }
}
