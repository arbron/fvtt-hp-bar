import HPBarBase from './default.js';
import { Color } from '../drawing.js';


export default class DemonLordBar extends HPBarBase {
  static shouldDraw(attribute) {
    return attribute === "characteristics.health";
  }

  draw(draw) {
    const _hp = duplicate(this.data.characteristics.health);
    const hp = {
      max: Number(_hp.max),
      value: Number(_hp.max) - (Number(_hp.value) || 0),
    }

    const size = hp.max;

    const valuePct = Math.clamped(hp.value, 0, hp.max) / size;

    draw.background()
        .current(valuePct, Color.forValue(valuePct))
        .mainBorder();
  }
}
