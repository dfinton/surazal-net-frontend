import { makeObservable, observable, action } from "mobx";

import { LinkFetchError } from "@/error";
import cms from "@/service/cms";

class CmsLinkStore {
  link = {};
  pendingRequests = new Set();

  constructor() {
    makeObservable(this, {
      link: observable,
      pendingRequests: observable,
      fetchLink: action,
    });
  }

  async fetchLink({ link }) {
    if (this.link[link] || this.pendingRequests.has(link)) {
      return;
    }

    this.pendingRequests.add(link);

    let response;

    try {
      response = await cms(`
        {
          link(
            where: {
              slug: "${link}"
            }
          ) {
            slug
            label
            linkList
          }
        }
      `);
    } catch (error) {
      throw new LinkFetchError(error.message);
    } finally {
      this.pendingRequests.delete(link);
    }

    const { data } = response;
    const linkData = data?.link;

    if (!linkData) {
      return;
    }

    this.link[linkData.slug] = linkData;
  }
}

const cmsLinkStore = new CmsLinkStore();

export default cmsLinkStore;
