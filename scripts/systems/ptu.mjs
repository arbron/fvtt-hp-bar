import HPBarBase from './default.mjs';
import { Color } from '../drawing.mjs';


export default class PTUBar extends HPBarBase {
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
    return attribute === "health";
  }

  prepareData() {
    const hp = duplicate(this.system.health);
    const tmphp = duplicate(this.system.tempHp);
    return {
      max: Number(hp.total),
      modified_max: Number(hp.max),
      injuries: Number(hp.injuries),
      temp: Number(tmphp.value),
      tempmax: Number(tmphp.max),
      value: Number(hp.value),
    };
  }

  /** @inheritdoc */
  draw(draw) {
    const hp = this.prepareData();

    let size = hp.max;
    let injury_multiplier = Number(Math.max(0, (10 - hp.injuries)) / 10);
    let injury_loss = Math.floor(Number(Math.max(0, (hp.injuries/10)) * hp.max ));
    const currentMax = Math.max(0, Math.floor(Number(hp.max * injury_multiplier)) + Number(hp.tempmax));

    const positiveMax = size;

    // If temp exceeds max, bar is scaled to show total temp
    if (hp.temp > size) size = hp.temp;

    const tempPct = Math.clamped(hp.temp, 0, size) / size;
    const valuePct = Math.clamped(hp.value, 0, currentMax) / size;
    const maxPct = Math.clamped(positiveMax - injury_loss, 0, positiveMax) / size;
    const valueColorPct = Math.clamped(hp.value, 0, currentMax) / currentMax;

    const maxBackgroundColor = (hp.tempmax > injury_loss) ? Color.maxPositive : Color.maxNegative;

    draw.background();

    // Temp Max Background
    if (hp.tempmax - injury_loss != 0)
      draw.fill(maxPct, maxBackgroundColor);

    draw.current(valuePct, Color.forValue(valueColorPct))
        .temp(tempPct)
        .mainBorder();

    // Negative temp max line
    if (hp.tempmax - injury_loss < 0)
      draw.line(maxPct, 0xf4f4f4);
  }
}
