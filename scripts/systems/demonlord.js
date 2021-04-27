import HPBarBase from './default.js';
import { Color } from '../drawing.js';


export default class DemonLordBar extends HPBarBase {
  static shouldDraw(attribute) {
    return attribute === "characteristics.health";
  }

  getData() {
    const health = duplicate(this.data.characteristics.health);
    const healthbonus = Number(this.data.characteristics.healthbonus);
    const max = Number(health.max)
    const damage = Number(health.value)

    const value = max + healthbonus - damage

    return {
      nonlethal: 0,
      max,
      temp: 0,
      tempmax: healthbonus,
      value,
    }
  }

  draw(draw) {
    const hp = this.getData()
  
    let size = hp.max;
    const currentMax = Math.max(0, Number(hp.max) + Number(hp.tempmax));
  
    // Size of bar is max + temp max if temp max is positive
    if (hp.tempmax > 0) size += hp.tempmax;
    const positiveMax = size;
  
    // If temp exceeds max, bar is scaled to show total temp
    if (hp.temp > size) size = hp.temp;
  
    const tempPct = Math.clamped(hp.temp, 0, size) / size;
    const valuePct = Math.clamped(hp.value, 0, currentMax) / size;
    const maxPct = Math.clamped(positiveMax - Math.abs(hp.tempmax), 0, positiveMax) / size;
    const valueColorPct = Math.clamped(hp.value, 0, currentMax) / currentMax;
  
    const maxBackgroundColor = (hp.tempmax > 0) ? 0xf4f4f4 : 0x999999;
  
    draw.background();
  
    // Temp Max Background
    if (hp.tempmax != 0)
      draw.fill(maxPct, maxBackgroundColor);
  
    draw.current(valuePct, Color.forValue(valueColorPct))
        .temp(tempPct);
  
    // Negative temp max line
    if (hp.tempmax < 0)
      draw.line(maxPct, 0xf4f4f4);
  }
}