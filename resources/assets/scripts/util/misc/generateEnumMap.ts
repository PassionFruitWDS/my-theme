/**
 * Generate a map of enums to values of a given type.
 *
 * @param keys Array of keys of an enum.
 * @param func Function that produces the map values. If it takes arguments, the first argument must be a key.
 * @param args Arguments of `func`.
 */
export default function generateEnumMap<
	ENUM,
	T,
	F extends (key: keyof ENUM, ...args: any[]) => T
>(
	keys: (keyof ENUM)[],
	func: F,
	...args: F extends (
		key: keyof ENUM,
		...args: infer P
	) => T ? P : never): Record<keyof ENUM, T> {

	const map = {};

	function appendKeyValue(key: keyof ENUM): void {
		this[key] = func(key, ...args);
	}

	keys.forEach(appendKeyValue, map);

	return (map as Record<keyof ENUM, T>);

}
