

export function drawHPBar(number, bar, data) {
  const hp = this.actor.data.data.attributes.hp;

  // Size of bar is max + tempMax (if positive), or temp (if temp is larger than max)
  let size = hp.max;
  if (hp.tempmax > 0) size += hp.tempmax;
  if (hp.temp > size) size = hp.temp;

  const tempPct = Math.clamped(hp.temp, 0, size) / size;
  const valuePct = Math.clamped(hp.value, 0, size) / size;
  const maxPct = Math.clamped(Math.abs(hp.tempmax), 0, size) / size;
  const valueColorPct = Math.clamped(hp.value, 0, hp.max + hp.tempmax) / (hp.max + hp.tempmax);

  const tempColor = 0x559cc6;
  const valueColor = [(1-(valueColorPct/2)), valueColorPct, 0];
  const maxColor = (hp.tempmax > 0) ? 0xf4f4f4 : 0x999999;

  const w = this.w;
  let h = Math.max((canvas.dimensions.size / 12), 8);
  if ( this.data.height >= 2 ) h *= 1.6;  // Enlarge the bar for large tokens

  // Draw the bar
  bar.clear()
     .beginFill(0x000000, 0.5)
     .lineStyle(2, 0.000000, 0.9)
     .drawRoundedRect(0, 0, w, h, 3)  // Background
     .beginFill(maxColor, 0.5)
     .lineStyle(0, 0x000000, 0.0)
     .drawRoundedRect((1-maxPct)*(w-2), 1, maxPct*(w-2), h-2, 2)  // Max HP Bar
     .beginFill(PIXI.utils.rgb2hex(valueColor), 0.8)
     .lineStyle(1, 0x000000, 0.8)
     .drawRoundedRect(1, 1, valuePct*(w-2), h-2, 2)  // Current HP Bar
     .beginFill(tempColor, 0.6)
     .lineStyle(1, 0x000000, 0.4)
     .drawRoundedRect(1, 1, tempPct*(w-2), h-2, 2);  // Temp HP Bar

  // Set position
  let posY = number === 0 ? this.h - h : 0;
  bar.position.set(0, posY);
}
