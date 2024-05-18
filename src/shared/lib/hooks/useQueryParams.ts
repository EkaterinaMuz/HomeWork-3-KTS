import { useLocation } from 'react-router-dom';
import rootStore from '@/shared/RootStore/instance';

export const useQueryParams = () => {
  const { search } = useLocation();

  rootStore.query.setSearch(search);
};
