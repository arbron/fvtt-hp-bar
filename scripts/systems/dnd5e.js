import HPBarBase from './default.js';
import { Color } from '../drawing.js';


export default class DnD5eBar extends HPBarBase {
  /** @inheritdoc */
  static get themeOptions() {
    return [
      ...super.themeOptions,
      HPBarBase._defaultTempTheme,
      HPBarBase._defaultMaxTheme()
    ];
  }

  /** @inheritdoc */
  draw(draw) {
    const _hp = duplicate(this.system.attributes.hp);
    const hp = {
      max: Number(_hp.max),
      temp: Number(_hp.temp),
      tempmax: Number(_hp.tempmax),
      value: Number(_hp.value),
    };

    let size = hp.max;
    const currentMax = Math.max(0, Number(_hp.max) + Number(_hp.tempmax));

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
