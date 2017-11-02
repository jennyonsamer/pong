import {
	SVG_NS
} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
// import Ball from './Ball';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.gameElement = document.getElementById(this.element)
		this.board = new Board(this.width, this.height);

		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;

		this.paddleOne = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			(this.height - this.paddleHeight) / 2
		);

		this.paddleTwo = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			(this.height - this.paddleHeight) / 2
		);
		// this.ball = new Ball(this.width,this.height);
	}

	render() {
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
	}

}