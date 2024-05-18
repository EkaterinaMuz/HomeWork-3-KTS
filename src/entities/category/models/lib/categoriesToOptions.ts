import { Category } from '@/entities/products/types';
import { Option } from '@/shared/UI/MultiDropdown';
import { CollectionModel } from '@/shared/lib/collection';

const categoriesToOption = (categories: CollectionModel<number, Category>): Option[] => {
  return categories.order.map((id: number) => ({
    key: String(id),
    value: categories.entities[id].name,
  }));
};

export { categoriesToOption };
