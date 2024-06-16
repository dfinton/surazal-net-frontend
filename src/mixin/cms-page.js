import cmsPageStore from "@/store/cms-page";

export default (SuperClass) =>
  class CmsPageMixin extends SuperClass {
    cmsPageStore;

    constructor() {
      super();

      this.cmsPageStore = cmsPageStore;
    }

    async fetchCmsPage({ section }) {
      try {
        this.cmsPageStore.fetchPage({ section });
      } catch (error) {
        console.error(error);
      }
    }
  };
