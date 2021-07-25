import constants from './shared/constants.js';
import { defaultTheme } from "./theme.js";


export class Color {
  static get black() { return 0x000000; }
  static get background() { return Color.themed("background"); }
  static get border() { return Color.themed("border"); }
  static get temp() { return Color.themed("temp"); }
  static get nonlethal() { return Color.themed("nonlethal"); }
  static get staggered() { return Color.themed("staggered"); }
  static get maxPositive() { return Color.themed("maxPositive"); }
  static get maxNegative() { return Color.themed("maxNegative"); }

  static forValue(pct) {
    return PIXI.utils.rgb2hex([(1-(pct/2)), pct, 0]);
  }

  static themed(key) {
    const theme = game.settings.get(constants.moduleName, "customizedTheme");
    key = `${key}Color`;
    return theme ? theme[key] ?? defaultTheme[key] : defaultTheme[key];
  }
}

export class Draw {
  constructor(bar, width, height) {
    this.bar = bar;
    try {
      this.bar.clear();
    } catch (err) {}
    this.w = width;
    this.h = height;
    this.b = Math.clamped(this.h / 8, 1, 2);
    this.i = this.b + 1;
  }

  background() {
    this.bar.beginFill(Color.background, 0.5)
            .lineStyle(0)
            .drawRoundedRect(0, 0, this.w, this.h, 3);
    return this;
  }

  mainBorder(color=Color.border) {
    return this.border({ color });
  }

  current(pct, color) {
    if (pct <= 0) return this;
    this.bar.beginFill(color, 1.0)
            .lineStyle(1, Color.border, 1.0)
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

  nonlethal(pct, color=Color.nonlethal) {
    if (pct <= 0) return this;
    return this.border({ pct, inset: this.b, radius: 2, color });
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

  border({ pct=1.0, inset=0, radius=3, color=Color.border, opacity=1.0 }={}) {
    this.bar.beginFill(0, 0.0)
            .lineStyle(this.b, color, opacity)
            .drawRoundedRect(inset, inset, (pct*this.w)-(2*inset), this.h-(2*inset), radius);
    return this;
  }
}
