import constants from './shared/constants.js';
import { defaultTheme } from "./theme.js";


export class Color {
  static get black() { return 0x000000; }
  static get temp() { return Color._themedColor("tempColor"); }
  static get nonlethal() { return Color._themedColor("nonlethalColor"); }
  static get staggered() { return Color._themedColor("staggeredColor"); }
  static get maxPositive() { return Color._themedColor("maxPositiveColor"); }
  static get maxNegative() { return Color._themedColor("maxNegativeColor"); }

  static forValue(pct) {
    return PIXI.utils.rgb2hex([(1-(pct/2)), pct, 0]);
  }

  static _themedColor(key) {
    const theme = game.settings.get(constants.moduleName, "customizedTheme");
    return theme ? theme[key] ?? defaultTheme[key] : defaultTheme[key];
  }
}

export class Draw {
  constructor(bar, width, height) {
    this.bar = bar;
    this.bar.clear();
    this.w = width;
    this.h = height;
    this.b = Math.clamped(this.h / 8, 1, 2);
    this.i = this.b + 1;
  }

  background() {
    this.bar.beginFill(Color.black, 0.5)
            .lineStyle(0)
            .drawRoundedRect(0, 0, this.w, this.h, 3);
    return this;
  }

  mainBorder() {
    return this.outerBorder(1.0, Color.black, 1.0);
  }

  current(pct, color) {
    if (pct <= 0) return this;
    this.bar.beginFill(color, 1.0)
            .lineStyle(1, Color.black, 1.0)
            .drawRoundedRect(0, 0, pct*(this.w), this.h, 2);
    return this;
  }

  temp(pct, color=Color.temp) {
    if (pct <= 0) return this;
    this.bar.beginFill(color, 1.0)
            .lineStyle(0)
            .drawRoundedRect(this.i, this.i, (pct*this.w)-(2*this.i), this.h-(2*this.i), 1);
    return this;
  }

  fill(pct, color) {
    this.bar.beginFill(color, 0.5)
            .lineStyle(0)
            .drawRoundedRect((pct)*(this.w), 0, (1-pct)*this.w, this.h, 0)
    return this;
  }

  line(pct, color) {
    this.bar.lineStyle(2, color, 0.8)
            .moveTo((pct)*(this.w-2), -1)
            .lineTo((pct)*(this.w-2), this.h+1);
    return this;
  }

  outerBorder(pct, color, opacity=0.7) {
    this.bar.beginFill(Color.black, 0.0)
            .lineStyle(this.b, color, opacity)
            .drawRoundedRect(0, 0, pct*this.w, this.h, 3);
    return this;
  }
}
