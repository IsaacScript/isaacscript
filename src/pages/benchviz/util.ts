export interface JoinResult<T> {
    left?: T;
    right?: T;
}

export function joinOnProperty<TItem, TKey>(
    left: TItem[],
    right: TItem[],
    propertySelector: (item: TItem) => TKey,
): Array<JoinResult<TItem>> {
    const map = new Map<TKey, JoinResult<TItem>>();

    for (const item of left) {
        map.set(propertySelector(item), { left: item });
    }
    for (const item of right) {
        const key = propertySelector(item);
        const entry = map.get(key);
        if (entry) {
            entry.right = item;
        } else {
            map.set(key, { right: item });
        }
    }

    return [...map.values()];
}
