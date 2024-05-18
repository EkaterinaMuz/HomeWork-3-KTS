import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryStore from '@/entities/category/models/store';
import { useProductStore } from '@/entities/products/models/store/context';
import useLocalStore from '@/shared/lib/hooks/useLocalStore';
import { Meta } from '@/shared/types/Meta';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import MultiDropdown, { Option } from '@/shared/ui/MultiDropdown';
import useDebounce from '../lib/hooks/useDebounce';
import s from './Search.module.scss';

export type SearchParams = {
  searchValue?: string,
  options?: Option[]
}
const Search = () => {
  const { productStore } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('search') || '';
  const categoryID = searchParams.get('categoryId') || '';
  const searchQuery = useDebounce(title, 1500);

  const categoryStore = useLocalStore(() => new CategoryStore());

  type QueryParams = {
    search?: string;
    categoryId?: string;
  };

  const getTitle = (options: Option[]) => {
    if (options.length) {
      return options[0].value;
    } else return 'Filter';
  };

  React.useEffect(() => {
    categoryStore.getCategoryList('/categories');
  }, [categoryStore]);

  React.useEffect(() => {
    categoryStore.setCurrentCategory(categoryID);
  }, [categoryID, categoryStore]);

  React.useEffect(() => {

    productStore.getProductsList('/products', { offset: 0, limit: 10, title, categoryId: categoryID });
  }, [searchQuery, categoryID, title, productStore]);


  const getSearchParams = (value: SearchParams) => {
    const search = value.searchValue || title || null;
    const categoryId = (value?.options && value.options[0]?.key) || categoryID || null;
    categoryStore.setCurrentCategory(categoryId);
    const params: QueryParams = {
      ...(search && { search }),
      ...(categoryId && { categoryId }),
    };
    setSearchParams(params);
  };



  return (
    <div className={s.searchbar_wrapper}>
      <div className={s.search_wrapper}>
        <Input value={searchParams.get('search') || ''} placeholder="Search product" onChange={getSearchParams} />
        <Button loading={productStore.meta === Meta.loading}>Find now</Button>
      </div>
      <div className={s.dropdown_wrapper}>
        <MultiDropdown
          options={categoryStore.categories}
          value={
            categoryStore.currentCategory && categoryStore.currentCategory.length > 0
              ? categoryStore.currentCategory
              : []
          }
          getTitle={getTitle}
          onChange={getSearchParams}
        />
      </div>
    </div>
  );
};

export default observer(Search);
