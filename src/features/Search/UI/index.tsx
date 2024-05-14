import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import useLocalStore from '@/shared/lib/hooks/useLocalStore';
import { Meta } from '@/shared/types/Meta';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import MultiDropdown, { Option } from '@/shared/ui/MultiDropdown';
import CategoryStore from '@entities/category/models/store';
import { useProductStore } from '@entities/products/models/store/context';
import rootStore from '@shared/RootStore/instance';
import useDebounce from '../libs/hooks/useDebounce';
import s from './Search.module.scss';

const Search = () => {
  const { productStore } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = rootStore.query.getParam('search') || '';
  const categoryId = searchParams.get('categoryId') || '';
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
    categoryStore.setCurrentCategory(categoryId);
  }, [categoryId, categoryStore]);

  React.useEffect(() => {
    productStore.getProductsList('/products', { offset: 0, limit: 10, title, categoryId });
  }, [searchQuery, categoryId, title, productStore]);

  const handleChange = (value: string) => {
    const search = value || null;
    const params: QueryParams = {
      ...(search && { search }),
      ...(categoryId && { categoryId }),
    };
    setSearchParams(params);
  };

  const handleOptionClick = (options: Option[]) => {
    const search = searchParams.get('search');
    const categoryId = options[0]?.key;
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
        <Input value={searchParams.get('search') || ''} placeholder="Search product" onChange={handleChange} />
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
          onChange={handleOptionClick}
        />
      </div>
    </div>
  );
};

export default observer(Search);
