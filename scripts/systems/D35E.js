import { Color, Draw } from '../drawing.js';


export function shouldDrawHPBar(attribute) {
  return attribute === "attributes.hp";
}

export function drawHPBar(number, bar, data) {
  const _hp = duplicate(this.actor.data.data.attributes.hp);
  const hp = {
    max: Number(_hp.max),
    temp: Number(_hp.temp),
    nonlethal: Number(_hp.nonlethal),
    value: Number(_hp.value),
  }

  const size = Math.max(hp.max, hp.temp);

  const tempPct = Math.clamped(hp.temp, 0, size) / size;
  const valuePct = Math.clamped(hp.value, 0, hp.max) / size;
  const nonlethalPct = Math.clamped(hp.nonlethal, 0, size) / size;
  const valueColorPct = Math.clamped(hp.value, 0, hp.max) / hp.max;

  const nonlethalColor = (nonlethalPct < valuePct) ? 0xd4f4d4 : 0xf43333;

  const w = this.w;
  let h = Math.max((canvas.dimensions.size / 12), 8);
  if ( this.data.height >= 2 ) h *= 1.6;  // Enlarge the bar for large tokens

  const draw = new Draw(bar, this.w, h);
  draw.background()
      .current(valuePct, Color.forValue(valueColorPct))
      .temp(tempPct)
  
  if (hp.nonlethal > 0)
    draw.outerBorder(nonlethalPct, nonlethalColor);


  // Set position
  let posY = number === 0 ? this.h - h : 0;
  bar.position.set(0, posY);
}
