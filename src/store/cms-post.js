import { makeObservable, observable, action } from "mobx";

import { BlogPostListFetchError, BlogPostDataFetchError, BlogPostCountFetchError } from "@/error";
import cms from "@/service/cms";

class CmsPostStore {
  post = {};
  postPendingRequests = new Set();

  latestPost = undefined;
  latestPostPendingRequest = false;
  
  postCount = undefined;
  postCountPendingRequest = false;

  postSummaryList = [];

  constructor() {
    makeObservable(this, {
      post: observable,
      latestPost: observable,
      postCount: observable,
      postSummaryList: observable,
      fetchLatestPost: action,
      fetchPost: action,
      fetchPostSummaryList: action,
      fetchPostCount: action,
    });
  }

  async fetchPost({ post }) {
    if (!post || this.post[post] || this.postPendingRequests.has(post)) {
      return;
    }

    this.postPendingRequests.add(post);

    let data;

    try {
      data = await cms(`
        {
          post(
            where: {
              slug: "${post}"
            }
          ) {
            slug
            title
            content {
              document
            }
            author {
              name
              email
            }
            createdAt
            fractals {
              slug
              altText
              thumbnail {
                slug
                name
                file {
                  filesize
                  width
                  height
                  url
                }
              }
            }
          }
        }
      `);
    } catch(error) {
      throw new BlogPostDataFetchError(error.message);
    } finally {
      this.postPendingRequests.delete(post);
    }

    const postData = data?.data?.post;

    if (!postData) {
      return;
    }

    this.post[postData.slug] = postData;
  }

  async fetchLatestPost() {
    if (this.latestPost !== undefined || this.latestPostPendingRequest) {
      return;
    }

    this.latestPostPendingRequest = true;

    let data;

    try {
      data = await cms(`
        {
          posts(
            orderBy: [{
              createdAt: desc
            }]
            take: 1
          ) {
            slug
            title
            content {
              document
            }
            author {
              name
              email
            }
            createdAt
            fractals {
              slug
              altText
              thumbnail {
                slug
                name
                file {
                  filesize
                  width
                  height
                  url
                }
              }
            }
          }
        }
      `);
    } catch(error) {
      throw new BlogPostDataFetchError(error.message);
    } finally {
      this.latestPostPendingRequest = false;
    }

    const postData = data?.data?.post;

    if (!postData) {
      return;
    }

    this.post[postData.slug] = postData;
    this.latestPost = postData.slug;
  }

  async fetchPostSummaryList({ page, pageSize }) {
    const take = pageSize;
    const skip = (page - 1) * pageSize;

    let data;

    try {
      data = await cms(`
        {
          posts(
            orderBy: [{
              createdAt: desc
            }]
            take: ${take}
            skip: ${skip}
          ) {
            slug
            title
            author {
              name
              email
            }
            createdAt
          }
        }
      `);
    } catch(error) {
      throw new BlogPostListFetchError(error.message);
    }

    const postsData = data?.data?.posts ?? [];

    this.postSummaryList = postsData;
  }

  async fetchPostCount() {
    if (this.postCount !== undefined || this.postCountPendingRequest) {
      return;
    }

    this.postCountPendingRequest = true;

    let data;

    try {
      data = await cms(`
        {
          postsCount
        }
      `);
    } catch(error) {
      throw new BlogPostCountFetchError(error.message);
    } finally {
      this.postCountPendingRequest = false;
    }

    const postCount = data?.data?.postsCount ?? 0;

    this.postCount = postCount;
  }
}

const cmsPostStore = new CmsPostStore();

export default cmsPostStore;
