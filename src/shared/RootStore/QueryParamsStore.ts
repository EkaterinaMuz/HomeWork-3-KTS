import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';
import { ILocalStore } from './../libs/hooks/useLocalStore';

type PrivateFileds = '_params' | '_search';

class QueryParamsStore implements ILocalStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFileds>(this, {
      _params: observable.ref,
      _search: observable,
      setSearch: action.bound,
      getParam: action.bound,
    });
  }

  getParam(key: string): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setSearch(searchString: string) {
    if (this._search !== searchString) {
      this._search = searchString;
      console.log(searchString);
      searchString = searchString.startsWith('?') ? searchString.slice(1) : searchString;
      this._params = qs.parse(searchString);
      console.log(this._params);
    }
  }

  destroy() {}
}

export default QueryParamsStore;
