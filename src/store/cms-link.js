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
      setLink: action,
    });
  }

  async fetchLink({ link }) {
    if (this.link[link] || this.pendingRequests.has(link)) {
      return;
    }

    this.pendingRequests.add(link);

    let data;

    try {
      data = await cms(`
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

    const linkData = data?.data?.link;

    if (!linkData) {
      return;
    }

    this.setLink({ linkData });
  }

  setLink({ linkData }) {
    this.link[linkData.slug] = linkData;
  }
}

const cmsLinkStore = new CmsLinkStore();

export default cmsLinkStore;
