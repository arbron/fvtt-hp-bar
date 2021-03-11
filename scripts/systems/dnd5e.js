import { Color, Draw } from '../drawing.js';


export function shouldDrawHPBar(attribute) {
  return attribute === "attributes.hp";
}

export function drawHPBar(number, bar, data) {
  const _hp = duplicate(this.actor.data.data.attributes.hp);
  const hp = {
    max: Number(_hp.max),
    temp: Number(_hp.temp),
    tempmax: Number(_hp.tempmax),
    value: Number(_hp.value),
  }

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
  const valueColorPct = Math.clamped(hp.value, 0, currentMax) / currentMax;

  const maxBackgroundColor = (hp.tempmax > 0) ? 0xf4f4f4 : 0x999999;

  const w = this.w;
  let h = Math.max((canvas.dimensions.size / 12), 8);
  if ( this.data.height >= 2 ) h *= 1.6;  // Enlarge the bar for large tokens

  const draw = new Draw(bar, this.w, h);
  draw.background();

  // Temp Max Background
  if (hp.tempmax != 0)
    draw.fill(maxPct, maxBackgroundColor);

  draw.current(valuePct, Color.forValue(valueColorPct))
      .temp(tempPct);

  // Negative temp max line
  if (hp.tempmax < 0)
    draw.line(maxPct, 0xf4f4f4);

  // Set position
  let posY = number === 0 ? this.h - h : 0;
  bar.position.set(0, posY);
}
