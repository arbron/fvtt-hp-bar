import HPBarBase from './default.js';
import { Color } from '../drawing.js';


export default class DemonLordBar extends HPBarBase {
  /** @inheritdoc */
  static get themeOptions() {
    return [
      HPBarBase._defaultMaxTheme,
      {
        label: "HPBAR.HeaderInjured",
        icon: "fas fa-user-injured",
        options: [
          { name: "injuredColor", label: "HPBAR.InjuredColor", type: "color", default: 0xa30000 }
        ]
      }
    ];
  }

  /** @inheritdoc */
  static shouldDraw(attribute) {
    return attribute === "characteristics.health";
  }

  /** @inheritdoc */
  draw(draw) {
    const hp = this.data;

    let size = hp.max;
    const currentMax = Math.max(0, Number(hp.max) + Number(hp.tempmax));

    // Size of bar is max + temp max if temp max is positive
    if (hp.tempmax > 0) size += hp.tempmax;
    const positiveMax = size;

    const valuePct = Math.clamped(hp.value, 0, currentMax) / size;
    const maxPct = Math.clamped(positiveMax - Math.abs(hp.tempmax), 0, positiveMax) / size;

    const maxBackgroundColor = (hp.tempmax > 0) ? Color.maxPositive : Color.maxNegative;
    const borderColor = hp.injured ? Color.themed("injuredColor") : Color.black;

    draw.background();
  
    // Temp Max Background
    if (hp.tempmax != 0)
      draw.fill(maxPct, maxBackgroundColor);

    draw.current(valuePct, Color.forValue(valuePct))
        .mainBorder(borderColor);

    // Negative temp max line
    if (hp.tempmax < 0)
      draw.line(maxPct, 0xf4f4f4);
  }

  /** @inheritdoc */
  get data() {
    const health = duplicate(super.data.characteristics.health);
    const healthbonus = Number(super.data.characteristics.healthbonus);
    const max = Number(health.max)
    const damage = Number(health.value)

    const value = max + healthbonus - damage

    return {
      max,
      tempmax: healthbonus,
      value,
      injured: health.injured ?? false
    }
  }
}
