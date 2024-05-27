import { makeObservable, observable, action } from "mobx";
import cms from "../service/cms";

class CmsPageStore {
  page = {};

  constructor() {
    makeObservable(this, {
      page: observable,
      fetchPage: action,
      setPage: action,
    });
  }

  async fetchPage({ sectionSlug }) {
    if (this.page[sectionSlug]) {
      return;
    }

    const response = await cms(`
      {
        pages(
          where: {
            section: {
              slug: {
                equals: "${sectionSlug}"
              }
            }
          }
          orderBy: {
            createdAt: desc
          }
          take: 1
          skip: 0
        ) {
          id
          content {
            document
          }
          section {
            slug
          }
        }
      }
    `);

    const { data } = response;

    if (!data.pages) {
      return;
    }

    this.setPage({ page: data.pages[0] });
  }

  setPage({ page }) {
    const sectionSlug = page.section?.slug;

    if (sectionSlug) {
      this.page[page.section.slug] = page;
    }
  }
}

const cmsPageStore = new CmsPageStore();

export default cmsPageStore;