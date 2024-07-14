import cmsFractalStore from "@/store/cms-fractal";

export default (SuperClass) =>
  class CmsFractalMixin extends SuperClass {
    constructor() {
      super();

      this.cmsFractalStore = cmsFractalStore;
    }

    async fetchCmsFractalImage({ image }) {
      try {
        await this.cmsFractalStore.fetchImage({ image });
      } catch (error) {
        console.error(error);
      }
    }

    async fetchCmsFractalImageSummaryList({ page, pageSize }) {
      try {
        await this.cmsFractalStore.fetchImageSummaryList({
          page: this.page,
          pageSize: this.pageSize,
        });
      } catch (error) {
        console.error(error);
      }
    }

    async fetchCmsFractalImageCount() {
      try {
        await this.cmsFractalStore.fetchImageCount();
      } catch (error) {
        console.error(error);
      }
    }
  };
