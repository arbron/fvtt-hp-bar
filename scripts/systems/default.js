import { Color, Draw } from '../drawing.js';


export default class HPBarBase {
  constructor(token, number, bar) {
    this.token = token;
    this.barNumber = number;
    this.bar = bar;

    this.w = token.w;
    this.h = Math.max((canvas.dimensions.size / 12), 8);
    if ( token.data.height >= 2 ) this.h *= 1.6;  // Enlarge the bar for large tokens
  }

  /**
   * Should the custom HP bar drawing method be used?
   *
   * @param {String} attribute  Key path to the attribute to be drawn in the bar.
   * @return {boolean}          Whether to use the custom HP bar or the core Foundry bar.
   */
  static shouldDraw(attribute) {
    return attribute === "attributes.hp";
  }

  draw(draw) {
    let _hp = duplicate(this.data.attributes.hp);
    const hp = {
      max: Number(_hp.max),
      temp: Number(getProperty(_hp, "temp") || 0),
      nonlethal: Number(getProperty(_hp, "nonlethal") || 0),
      value: Number(_hp.value),
    }
  
    const size = Math.max(hp.max, hp.temp);
  
    const tempPct = Math.clamped(hp.temp, 0, size) / size;
    const valuePct = Math.clamped(hp.value, 0, hp.max) / size;
    const valueColorPct = Math.clamped(hp.value, 0, hp.max) / hp.max;

    draw.background()
        .current(valuePct, Color.forValue(valueColorPct))
        .temp(tempPct);

    if (_hp.nonlethal > 0) {
      const nonlethalPct = Math.clamped(hp.nonlethal, 0, size) / size;
      const nonlethalColor = (nonlethalPct < valuePct) ? Color.nonlethal : Color.staggered;
      draw.outerBorder(nonlethalPct, nonlethalColor);
    }
  }

  get data() {
    return this.token.actor.data.data;
  }


  /* ---------------------------------------- */
  /*              Private Methods             */
  /* ---------------------------------------- */

  _draw() {
    this._predraw();
    const draw = new Draw(this.bar, this.token.w, this.h);
    this.draw(draw);
    this._postdraw();
  }

  _predraw() {
    // this.bar.clear();
  }

  _postdraw() {
    // Set position
    let posY = this.barNumber === 0 ? this.token.h - this.h : 0;
    this.bar.position.set(0, posY);
  }
}
