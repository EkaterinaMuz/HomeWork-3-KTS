import { Category } from '@/entities/products/types';
import { CollectionModel } from '@/shared/lib/collection';
import { Option } from '@/shared/ui/MultiDropdown';

const categoriesToOption = (categories: CollectionModel<number, Category>): Option[] => {
  return categories.order.map((id: number) => ({
    key: String(id),
    value: categories.entities[id].name,
  }));
};

export { categoriesToOption };
