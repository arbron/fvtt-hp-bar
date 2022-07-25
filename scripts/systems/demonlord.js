import HPBarBase from './default.js';
import { Color } from '../drawing.js';


export default class DemonLordBar extends HPBarBase {
  /** @inheritdoc */
  static get themeOptions() {
    return [
      ...super.themeOptions,
      HPBarBase._defaultMaxTheme("Bonus"),
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

  prepareData() {
    const health = duplicate(this.system.characteristics.health);
    const bonus = Number(this.system.characteristics.healthbonus ?? 0);
    const max = Number(health.max);
    const damage = Number(health.value);

    const value = max + bonus - damage;

    return { max, bonus, value, injured: health.injured ?? false };
  }

  /** @inheritdoc */
  draw(draw) {
    const hp = this.prepareData();

    // Size of bar is max + bonus if bonus is positive
    const effectiveMax = Math.max(0, hp.max + hp.bonus);
    const displayMax = hp.max + (hp.bonus > 0 ? hp.bonus : 0);

    const valuePct = Math.clamped(hp.value, 0, effectiveMax) / displayMax;
    const bonusPct = Math.clamped(displayMax - Math.abs(hp.bonus), 0, effectiveMax) / displayMax;

    const bonusBackgroundColor = (hp.bonus > 0) ? Color.maxPositive : Color.maxNegative;
    const borderColor = hp.injured ? Color.themed("injured") : Color.border;

    draw.background();
  
    // Bonus Background
    if (hp.bonus != 0)
      draw.fill(bonusPct, bonusBackgroundColor);

    draw.current(valuePct, Color.forValue(valuePct))
        .mainBorder(borderColor);

    // Negative bonus line
    if (hp.bonus < 0)
      draw.line(bonusPct, 0xf4f4f4);
  }
}
