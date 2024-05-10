export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const normalizeCollection = <K extends string | number, T>(
  getKeyForElement: (element: T) => K,
  list: T[],
): CollectionModel<K, T> => {
  const collection = getInitialCollectionModel();
  list.forEach((elem: T) => {
    const id = getKeyForElement(elem);
    collection.order.push(id);
    collection.entities[id] = elem;
  });
  return collection;
};

export const linearizeCollection = <K extends string | number, T>(collection: CollectionModel<K, T>): T[] => {
  return collection.order.map((id: K) => collection.entities[id]);
};
