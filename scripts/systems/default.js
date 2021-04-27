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


  /* ---------------------------------------- */
  /*            Theme Configuration           */
  /* ---------------------------------------- */

  /**
   * Configuration options presented in the theme window along with their default values.
   *
   * @return {Array}
   */
  static get themeOptions() {
    return [
      HPBarBase._defaultTempTheme,
      HPBarBase._defaultNonlethalTheme
    ];
  }

  static get _defaultTempTheme() {
    return {
      label: "HPBAR.HeaderTemp",
      icon: "fas fa-soap",
      options: [
        { name: "tempColor", label: "HPBAR.TempColor", type: "color", default: 0x66ccff }
      ]
    };
  }

  static get _defaultNonlethalTheme() {
    return {
      label: "HPBAR.HeaderNonlethal",
      icon: "fas fa-fist-raised",
      options: [
        { name: "nonlethalColor", label: "HPBAR.NonlethalColor", type: "color", default: 0xffff00 },
        { name: "staggeredColor", label: "HPBAR.StaggeredColor", type: "color", default: 0xff0000 }
      ]
    }
  }

  static get _defaultMaxTheme() {
    return {
      label: "HPBAR.HeaderMax",
      icon: "fas fa-cloud-sun-rain",
      options: [
        { name: "maxPositiveColor", label: "HPBAR.MaxPositiveColor", type: "color", default: 0xf4f4f4 },
        { name: "maxNegativeColor", label: "HPBAR.MaxNegativeColor", type: "color", default: 0xb30000 }
      ]
    }
  }


  /* ---------------------------------------- */
  /*                  Drawing                 */
  /* ---------------------------------------- */

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
        .temp(tempPct)
        .mainBorder();

    if (_hp.nonlethal > 0) {
      const nonlethalPct = Math.clamped(hp.nonlethal, 0, size) / size;
      const nonlethalColor = (nonlethalPct < valuePct) ? Color.nonlethal : Color.staggered;
      draw.nonlethal(nonlethalPct, nonlethalColor);
    }
  }

  get data() {
    return this.token.actor.data.data;
  }


  /* ---------------------------------------- */
  /*              Private Methods             */
  /* ---------------------------------------- */

  /**
   * Step through the drawing process.
   *
   * @protected
   */
  _draw() {
    this._predraw();
    const draw = new Draw(this.bar, this.token.w, this.h);
    this.draw(draw);
    this._postdraw();
  }

  /**
   * Steps to perform before drawing.
   *
   * @protected
   */
  _predraw() {
    // this.bar.clear();
  }

  /**
   * Steps to perform after drawing.
   *
   * @protected
   */
  _postdraw() {
    // Set position
    let posY = this.barNumber === 0 ? this.token.h - this.h : 0;
    this.bar.position.set(0, posY);
  }
}
