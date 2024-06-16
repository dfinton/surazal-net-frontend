import cmsPostStore from "@/store/cms-post";

export default (SuperClass) =>
  class CmsBlogMixin extends SuperClass {
    cmsPostStore;

    constructor() {
      super();

      this.cmsPostStore = cmsPostStore;
    }

    async fetchCmsPost({ post }) {
      try {
        await this.cmsPostStore.fetchPost({ post: this.post });
      } catch (error) {
        console.error(error);
      }
    }

    async fetchCmsPostSummaryList({ page, pageSize }) {
      try {
        await this.cmsPostStore.fetchPostSummaryList({
          page: this.page,
          pageSize: this.pageSize,
        });
      } catch (error) {
        console.error(error);
      }
    }

    async fetchCmsPostCount() {
      try {
        await this.cmsPostStore.fetchPostCount();
      } catch (error) {
        console.error(error);
      }
    }
  };
