import {
	SVG_NS,
	KEYS
} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Winner from './Winner';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.gameElement = document.getElementById(this.element)

		this.score1 = new Score(140, 50, 30);
		this.score2 = new Score(350, 50, 30);
		

		this.winner = new Winner(
			this.x,
			this.y,
			this.size,
			this.banner
		);
		this.winner1 = new Winner(110, 110, 30, 'Winner : Player 1!');
		this.winner2 = new Winner(110, 110, 30, 'Winner : Player 2!');

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
			KEYS.z
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

		this.yay = new Audio('public/sounds/winner.wav');

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
			this.reset;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewbox', `0 0 ${this.width} ${this.height}`);
		svg.setAttributeNS(null, 'version', '1.1');

		this.gameElement.appendChild(svg);

		let paddleOneWin = this.paddleOne.score >= 11;
		let paddleTwoWin = this.paddleTwo.score >= 11;

		if (paddleOneWin) {
			return this.winner1.render(svg, this.winner1.banner, this.yay.play(), setTimeout(location.reload.bind(location), 5500));
		} 
		
		else if (paddleTwoWin) {
			return this.winner2.render(svg, this.winner2.banner, this.yay.play(), setTimeout(location.reload.bind(location), 5500));
		}
		
		this.board.render(svg);
		this.paddleOne.render(svg);
		this.paddleTwo.render(svg);
		this.ball.render(svg, this.paddleOne, this.paddleTwo, );
		this.score1.render(svg, this.paddleOne.score);
		this.score2.render(svg, this.paddleTwo.score);
		}
		
	}

