import HPBarBase from './default.js';
import { Color } from '../drawing.js';


export default class Tormenta20Bar extends HPBarBase {
  /** @inheritdoc */
  static get themeOptions() {
    return [
      ...super.themeOptions,
      HPBarBase._defaultTempTheme,
      HPBarBase._defaultMaxTheme()
    ];
  }

  /** @inheritdoc */
	static shouldDraw(attribute) {
    return attribute === "attributes.pv";
  }
	
	/** @inheritdoc */
  draw(draw) {
    const _hp = duplicate(this.system.attributes.pv);
    const hp = {
      max: Number(_hp.max),
      temp: Number(_hp.temp),
      value: Number(_hp.value),
    };

    const size = Math.max(hp.max, hp.temp);
  
    const tempPct = Math.clamped(hp.temp, 0, size) / size;
    const valuePct = Math.clamped(hp.value, 0, hp.max) / size;
    const valueColorPct = Math.clamped(hp.value, 0, hp.max) / hp.max;

    draw.background()
        .current(valuePct, Color.forValue(valueColorPct))
        .temp(tempPct)
        .mainBorder();
  }
}
