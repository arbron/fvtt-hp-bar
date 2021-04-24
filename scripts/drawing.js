import constants from './shared/constants.js';
import { defaultTheme } from "./settings.js";


export class Color {
  static get black() { return 0x000000; }
  static get temp()  {
    const theme = game.settings.get(constants.moduleName, "customizedTheme");
    return theme?.tempColor ?? defaultTheme.tempColor;
  }

  static forValue(pct) {
    return PIXI.utils.rgb2hex([(1-(pct/2)), pct, 0]);
  }
}

export class Draw {
  constructor(bar, width, height) {
    this.bar = bar;
    this.bar.clear();
    this.w = width;
    this.h = height;
  }

  background() {
    this.bar.beginFill(Color.black, 0.5)
            .lineStyle(2, Color.black, 0.9)
            .drawRoundedRect(0, 0, this.w, this.h, 3);
    return this;
  }

  current(pct, color) {
    this.bar.beginFill(color, 0.8)
            .lineStyle(1, Color.black, 0.8)
            .drawRoundedRect(1, 1, pct*(this.w-2), this.h-2, 2);
    return this;
  }

  temp(pct, color=Color.temp) {
    this.bar.beginFill(color, 0.8)
            .lineStyle(1, Color.black, 0.4)
            .drawRoundedRect(1, 1, pct*(this.w-2), this.h-2, 2);
    return this;
  }

  fill(pct, color) {
    this.bar.beginFill(color, 0.5)
            .lineStyle(0, 0x000000, 0.0)
            .drawRoundedRect((pct)*(this.w-2), 1, (1-pct)*this.w, this.h-2, 2)
    return this;
  }

  line(pct, color) {
    this.bar.lineStyle(2, color, 0.8)
            .moveTo((pct)*(this.w-2), -1)
            .lineTo((pct)*(this.w-2), this.h+1);
    return this;
  }

  outerBorder(pct, color) {
    this.bar.beginFill(Color.black, 0.0)
            .lineStyle(2, color, 0.7)
            .drawRoundedRect(0, 0, pct*this.w, this.h, 3);
    return this;
  }
}
