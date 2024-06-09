import { makeObservable, observable, action } from "mobx";

class UrlSearchParamsStore {
  urlSearchParams = {};
  isReady = false;

  constructor() {
    makeObservable(this, {
      urlSearchParams: observable,
      fetchUrlSearchParams: action,
    });
  }

  urlSearchParam(param) {
    return this.urlSearchParams.param;
  }

  fetchUrlSearchParams() {
    if (this.isReady) {
      return;
    }

    this.urlSearchParams = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );
    this.isReady = true;
  }
}

const urlSearchParamsStore = new UrlSearchParamsStore();

export default urlSearchParamsStore;
