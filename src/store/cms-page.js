import { makeObservable, observable, action } from "mobx";

import { PageFetchError } from "@/error";
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

  async fetchPage({ section }) {
    if (
      !section ||
      this.page[section] ||
      this.pendingRequests.has(section)
    ) {
      return;
    }

    this.pendingRequests.add(section);

    let response;

    try {
      response = await cms(`
        {
          pages(
            where: {
              section: {
                slug: {
                  equals: "${section}"
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
      throw new PageFetchError(error.message);
    } finally {
      this.pendingRequests.delete(section);
    }

    const { data } = response;

    if (!data?.pages?.length) {
      return;
    }

    this.setPage({ page: data.pages[0] });
  }

  setPage({ page }) {
    const section = page.section?.slug;

    if (section) {
      this.page[section] = page;
    }
  }
}

const cmsPageStore = new CmsPageStore();

export default cmsPageStore;
