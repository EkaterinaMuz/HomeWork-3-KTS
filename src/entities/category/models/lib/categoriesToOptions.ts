import { Option } from '@shared/UI/MultiDropdown';
import { CollectionModel } from '@shared/libs/collection';
import { Category } from '@shared/types/Products';

const categoriesToOption = (categories: CollectionModel<number, Category>): Option[] => {
  return categories.order.map((id: number) => ({
    key: String(id),
    value: categories.entities[id].name,
  }));
};

export { categoriesToOption };
