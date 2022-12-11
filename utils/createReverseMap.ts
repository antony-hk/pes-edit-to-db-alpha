export const createReverseMap = <T>(map: Record<string, T> | Map<string, T>): Map<T, string> => {
    const reverseMap = new Map<T, string>();
    if (map instanceof Map) {
        const iterator = map.keys();
        let next = iterator.next();
        while (!next.done) {
            const key = next.value;
            reverseMap.set(map.get(key)!, key);
            next = iterator.next();
        }
    } else {
        Object.entries(map).forEach(([key, value]) => {
            reverseMap.set(value, key);
        });
    }
    return reverseMap;
};
