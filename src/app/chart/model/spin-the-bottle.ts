import * as d3 from 'd3';
import {Pie} from './pie';
import {Value} from './value';
import {Odds} from './odds';
import {Needle} from './needle';
import {TimePie} from './time-pie';
import {GameValue} from './game_value';

export class SpinTheBottle {

  g;

  pieG; pie: Pie;

  needleG; needle: Needle;

  timePieG; timePie: TimePie;

  gameValueG; gameValue: GameValue;

  youOddsG; youOdds: Odds;
  otherOddsG; othersOdds: Odds;

  scale = 100;
  betValue = 3;
  youBetsCount = 0;
  othersBetsCount = 0;

  width = this.scale * 10;
  height = this.scale * 10;
  outerRadius = Math.min(this.width, this.height) * 0.4;
  innerRadius =  this.outerRadius - this.scale;

  constructor(g) {
    this.g = g;

    this.pieG = this.g.append('g');
    this.pie = new Pie(this.pieG, this.innerRadius, this.outerRadius);

    this.needleG = g.append('g');
    this.needle = new Needle(this.needleG, this.outerRadius, this.pie);

    this.timePieG = g.append('g');
    this.timePie = new TimePie(this.timePieG, this.innerRadius);

    this.gameValueG = g.append('g');
    this.gameValue = new GameValue(this.gameValueG, 0, '$');

    this.youOddsG = g.append('g')
      .attr('class', 'you')
      .attr('transform', `translate(${this.outerRadius}, ${-this.outerRadius})`);
    this.youOdds = new Odds(this.youOddsG,
      0,
      'end');
    this.otherOddsG = g.append('g')
      .attr('class', 'others')
      .attr('transform', `translate(${-this.outerRadius}, ${-this.outerRadius})`);
    this.othersOdds = new Odds(this.otherOddsG,
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
    this.pie.updateValues([
      new Value('Me', 13, 'you')
    ]);
    this.gameValue.updateValue(this.betsValue());
    this.youOdds.updateValue(100 * this.youBetsCount / this.betsCount());
    this.othersOdds.updateValue(100 * this.othersBetsCount / this.betsCount());
  }

  placeOthersBets(count: number) {
    this.othersBetsCount = this.othersBetsCount + count;
    console.log('Place other bets', this.othersBetsCount, 'all', this.betsCount());
    this.pie.updateValues([
      new Value('Others', 15, 'others')
    ]);
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
