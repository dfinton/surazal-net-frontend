import { makeObservable, observable, action } from "mobx";
import cms from "@/service/cms";

class CmsPageStore {
  page = {};
  pendingRequests = new Set();

  constructor() {
    makeObservable(this, {
      page: observable,
      pendingRequests: observable,
      fetchPage: action,
      setPage: action,
    });
  }

  async fetchPage({ sectionSlug }) {
    if (this.page[sectionSlug] || this.pendingRequests.has(sectionSlug)) {
      return;
    }

    this.pendingRequests.add(sectionSlug);

    let response;

    try {
      response = await cms(`
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
    } catch (error) {
      throw new Error(error.message);
    } finally {
      this.pendingRequests.delete(sectionSlug);
    }

    const { data } = response;

    if (!data.pages) {
      return;
    }

    this.setPage({ page: data.pages[0] });
  }

  setPage({ page }) {
    const sectionSlug = page.section?.slug;

    if (sectionSlug) {
      this.page[sectionSlug] = page;
    }
  }
}

const cmsPageStore = new CmsPageStore();

export default cmsPageStore;
