import HPBarBase from './default.mjs';
import { Color } from '../drawing.mjs';


export default class DnD5eBar extends HPBarBase {
  static get themeOptions() {
    return [
      ...super.themeOptions,
      HPBarBase._defaultTempTheme,
      HPBarBase._defaultMaxTheme()
    ];
  }
  
  prepareData() {
    const hp = duplicate(this.system.attributes.hp);
    return {
      max: Number(hp.max),
      temp: Number(hp.temp),
      tempmax: Number(hp.tempmax),
      value: Number(hp.value),
    };
  }

  draw(draw) {
    const hp = this.prepareData();

    let size = hp.max;
    const currentMax = Math.max(0, hp.max + hp.tempmax);

    // Size of bar is max + temp max if temp max is positive
    if (hp.tempmax > 0) size += hp.tempmax;
    const positiveMax = size;

    // If temp exceeds max, bar is scaled to show total temp
    if (hp.temp > size) size = hp.temp;

    const tempPct = Math.clamped(hp.temp, 0, size) / size;
    const valuePct = Math.clamped(hp.value, 0, currentMax) / size;
    const maxPct = Math.clamped(positiveMax - Math.abs(hp.tempmax), 0, positiveMax) / size;
    const valueColorPct = Math.clamped(hp.value, 0, currentMax) / size;

    const maxBackgroundColor = (hp.tempmax > 0) ? Color.maxPositive : Color.maxNegative;

    draw.background();

    // Temp Max Background
    if (hp.tempmax != 0)
      draw.fill(maxPct, maxBackgroundColor);

    draw.current(valuePct, Color.forValue(valueColorPct))
        .temp(tempPct)
        .mainBorder();

    // Negative temp max line
    if (hp.tempmax < 0)
      draw.line(maxPct, 0xf4f4f4);
  }
}
