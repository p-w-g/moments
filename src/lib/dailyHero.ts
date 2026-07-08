// Deterministic "random" pick that stays stable for the whole day: same
// input date always lands on the same index, so SSR output doesn't flicker
// between requests, but the choice rotates once the date changes.
export function pickForToday<T>(items: T[], date = new Date()): T | undefined {
	if (items.length === 0) return undefined;
	const dayKey = date.toISOString().slice(0, 10);
	const hash = [...dayKey].reduce((acc, char) => acc + char.charCodeAt(0), 0);
	return items[hash % items.length];
}
