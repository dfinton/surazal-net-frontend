import cmsLinkStore from "@/store/cms-link";

export default (SuperClass) =>
  class CmsLinkMixin extends SuperClass {
    cmsLinkStore;

    constructor() {
      super();

      this.cmsLinkStore = cmsLinkStore;
    }

    async fetchCmsLink({ link }) {
      try {
        await this.cmsLinkStore.fetchLink({ link });
      } catch (error) {
        console.error(error);
      }
    }
  };
