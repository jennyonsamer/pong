import {
  SVG_NS
} from '../settings';

export default class Ball {

  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.reset();
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;

    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(p1, p2) {
    if (this.vx > 0) {
      //detect collision on right side (p2)
      let paddle = p2.coordinates(p2.x, p2.y, p2.width, p2.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        //pseudo code:right edge of the ball is >= left edge of the paddle
        this.x + this.radius >= leftX
        //ball Y is >= paddle top Y 
        &&
        this.y >= topY
        //ball Y is <= paddle bottom Y
        &&
        this.y <= bottomY
      ) {
        this.vz = this.vx;
      }

    } else {
      //detect collision on left side (p1)

    }
  }

  render(svg, p1, p2) {
    this.y += this.vy;
    this.x += this.vx;

    this.wallCollision();
    this.paddleCollision(p1, p2);

    let circle = document.createElementNS(SVG_NS, ‘circle’);
    circle.setAttributeNS(null, ‘r’, this.radius);
    circle.setAttributeNS(null, ‘cx’, this.x);
    circle.setAttributeNS(null, ‘cy’, this.y);
    circle.setAttributeNS(null, ‘fill’, ‘white’);

    svg.appendChild(circle);

  }

}



//game.js 


import {
  SVG_NS,
  KEYS
} from‘.. / settings’;
import Board from‘. / Board’;
import Paddle from‘. / Paddle’;
import Ball from‘. / Ball’;

export default class Game {

  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element);

    this.board = new Board(this.width, this.height);

    this.boardGap = 10;
    this.paddleWidth = 8;
    this.paddleHeight = 56;

    this.ball = new Ball(
      8,
      this.width,
      this.height,
    );

    this.paddleOne = new Paddle(
      this.width,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,

      KEYS.a,
      KEYS.z,
    );

    this.paddleTwo = new Paddle(
      this.width,
      this.paddleWidth,
      this.paddleHeight,
      (this.width - this.boardGap - this.paddleWidth),
      (this.height - this.paddleHeight) / 2,

      KEYS.up,
      KEYS.down,
    );

    document.addEventListener(‘keydown’, event => {
      if (event.key === KEYS.spaceBar) {
        this.pause = !this.pause
      }
    });
  }

  render() {

    if (this.pause) {
      return;
    }

    this.gameElement.innerHTML = ‘’;

    let svg = document.createElementNS(SVG_NS, ‘svg’);
    svg.setAttributeNS(null, ‘width’, this.width);
    svg.setAttributeNS(null, ‘height’, this.height);
    svg.setAttributeNS(null, ‘viewbox’, `0 0  ${this.width} ${this.height}`);
    svg.setAttributeNS(null, ‘version’, ‘1.1’);

    this.gameElement.appendChild(svg);

    this.board.render(svg)

    this.ball.render(svg);

    this.paddleOne.render(svg);
    this.paddleTwo.render(svg);

  }
}