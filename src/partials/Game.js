import {
	SVG_NS,
	KEYS
} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.gameElement = document.getElementById(this.element)

		this.score1 = new Score(140, 35, 30);
		this.score2 = new Score(350, 35, 30);

		this.board = new Board(this.width, this.height);
		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;

		this.paddleOne = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z,
		);

		this.paddleTwo = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			(this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down

		);

		this.radius = 8;

		this.ball = new Ball(
			this.radius, this.width, this.height);


		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause
			}
		});
	}

	render() {

		if (this.pause) {
			return;
		}

		if (this.score) {
			this.reset
		}

		this.gameElement.innerHTML = '';


		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewbox', `0 0 ${this.width} ${this.height}`);
		svg.setAttributeNS(null, 'version', '1.1');

		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.paddleOne.render(svg);
		this.paddleTwo.render(svg);
		this.ball.render(svg, this.paddleOne, this.paddleTwo, );
		this.score1.render(svg, this.paddleOne.score);
		this.score2.render(svg, this.paddleTwo.score);
	}

}