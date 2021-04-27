import HPBarBase from './default.js';
import { Color } from '../drawing.js';


export default class DemonLordBar extends HPBarBase {
  /** @inheritdoc */
  static get themeOptions() {
    return [{
      label: "HPBAR.HeaderInjured",
      icon: "fas fa-user-injured",
      options: [
        { name: "injuredColor", label: "HPBAR.InjuredColor", type: "color", default: 0xa30000 }
      ]
    }];
  }

  /** @inheritdoc */
  static shouldDraw(attribute) {
    return attribute === "characteristics.health";
  }

  /** @inheritdoc */
  draw(draw) {
    const _hp = duplicate(this.data.characteristics.health);
    const hp = {
      max: Number(_hp.max),
      value: Number(_hp.max) - (Number(_hp.value) || 0),
      injured: _hp.injured ?? false
    }

    const size = hp.max;

    const valuePct = Math.clamped(hp.value, 0, hp.max) / size;
    const borderColor = hp.injured ? Color.themed("injuredColor") : Color.black;

    draw.background()
        .current(valuePct, Color.forValue(valuePct))
        .mainBorder(borderColor);
  }
}
