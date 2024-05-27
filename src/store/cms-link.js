import { makeObservable, observable, action } from "mobx";
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

  async fetchLink({ slug }) {
    if (this.link[slug] || this.pendingRequests.has(slug)) {
      return;
    }

    this.pendingRequests.add(slug);

    let response;

    try {
      response = await cms(`
        {
          link(
            where: {
              slug: "${slug}"
            }
          ) {
            slug
            label
            linkList
          }
        }
      `);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      this.pendingRequests.delete(slug);
    }

    const { data } = response;

    if (!data.link) {
      return;
    }

    this.setLink({ link: data.link });
  }

  setLink({ link }) {
    const slug = link.slug;

    if (slug) {
      this.link[slug] = link;
    }
  }
}

const cmsLinkStore = new CmsLinkStore();

export default cmsLinkStore;
