import {
  SVG_NS
} from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-01.wav');
    this.point = new Audio ('public/sounds/score.wav');

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

  wallCollision(paddleOne, paddleTwo) {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    // if (hitLeft || hitRight) {
    //   this.vx = -this.vx;
    // } else if (hitTop || hitBottom) {
    //   this.vy = -this.vy;
    // }

    if (hitLeft) {
      this.goal(paddleTwo);
      this.direction = -1;
    } else if (hitRight) {
      this.direction = 1;
      this.goal(paddleOne);
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(paddleOne, paddleTwo) {
    if (this.vx > 0) {
      //detect collision on right side (p2)
      let paddle = paddleTwo.coordinates(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
      let {
        leftX,
        topY,
        bottomY
      } = paddle;

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
        this.vx = -this.vx;
        this.ping.play();
      }

    } else {
      //detect collision on left side (p1)
      let paddle = paddleOne.coordinates(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
      let {
        rightX,
        topY,
        bottomY
      } = paddle;
      if (
        this.x - this.radius <= rightX

        &&
        this.y >= topY

        &&
        this.y <= bottomY

      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
    }
  }

  goal(paddle) {
    paddle.score++;
    this.point.play();
    this.reset();
  }

  render(svg, paddleOne, paddleTwo) {
    this.y += this.vy;
    this.x += this.vx;

    this.wallCollision(paddleOne, paddleTwo);
    this.paddleCollision(paddleOne, paddleTwo);

    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'fill', 'white');

    svg.appendChild(circle);

  }

}