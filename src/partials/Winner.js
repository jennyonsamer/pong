import {
  SVG_NS
} from '../settings';

export default class Winner {
  constructor(x, y, size, banner) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.banner = banner;
  }

  render(svg, banner) {

    let text = document.createElementNS(SVG_NS, 'text');
    text.setAttributeNS(null, 'x', this.x);
    text.setAttributeNS(null, 'y', this.y);
    text.setAttributeNS(null, 'font-family', 'Silkscreen Web');
    text.setAttributeNS(null, 'font-size', this.size)
    text.setAttributeNS(null, 'fill', '#FFC0CB');
    text.textContent = banner;
    svg.appendChild(text);
    

  }
  
}