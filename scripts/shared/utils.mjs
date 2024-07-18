export function clamp(...args) {
	if ( (game.release?.generation ?? 1) < 12 ) return Math.clamped(...args);
	return Math.clamp(...args);
}

export function duplicate(...args) {
	if ( (game.release?.generation ?? 1) < 10 ) return duplicate(...args);
	return foundry.utils.deepClone(...args);
}

export function getProperty(...args) {
	if ( (game.release?.generation ?? 1) < 10 ) return getProperty(...args);
	return foundry.utils.getProperty(...args);
}
