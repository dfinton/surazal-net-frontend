import { makeObservable, observable, action } from "mobx";
import cms from "@/service/cms";

class CmsPostStore {
  post = {};
  latestPostId = undefined;
  postSummaryList = [];
  postCount = undefined;
  page = 1;
  pageSize = 10;
  pageCount = 0;

  constructor() {
    makeObservable(this, {
      post: observable,
      latestPostId: observable,
      postSummaryList: observable,
      postCount: observable,
      page: observable,
      pageSize: observable,
      pageCount: observable,
      fetchLatestPost: action,
      fetchPost: action,
      fetchPostList: action,
      fetchPostCount: action,
      calculatePageCount: action,
      setPost: action,
      setLatestPostId: action,
      setPostSummaryList: action,
      setPostCount: action,
      setPage: action,
      setPageSize: action,
      setPageCount: action,
    });
  }

  async fetchPost({ slug }) {
    if (this.post[slug]) {
      return;
    }

    const data = await cms(`
      {
        post(
          where: {
            slug: "${slug}"
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
        }
      }
    `);

    if (!data.post) {
      return;
    }

    this.setPost({ post: data.post });
  }

  async fetchLatestPost() {
    if (this.latestPostId !== undefined) {
      return;
    }

    const data = await cms(`
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
        }
      }
    `);

    if (!data.posts) {
      return;
    }

    const [post] = data.posts;

    this.setPost({ post });
    this.setLatestPostId({ slug: post.slug });
  }

  async fetchPostList({ page, pageSize }) {
    const take = pageSize;
    const skip = (page - 1) * pageSize;

    const data = await cms(`
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

    const posts = data?.data?.posts ?? [];

    this.setPostSummaryList({ postSummaryList: posts });
    this.setPage({ page });
    this.setPageSize({ pageSize });
  }

  async fetchPostCount() {
    if (this.postCount !== undefined) {
      return;
    }

    const data = await cms(`
      {
        postsCount
      }
    `);

    const postCount = data?.data?.postsCount ?? 0;

    this.setPostCount({ postCount });
  }

  calculatePageCount() {
    const pageCount = Math.ceil(this.postCount / this.pageSize);

    this.setPageCount({ pageCount });
  }

  setLatestPostId({ slug }) {
    this.latestPostId = slug;
  }

  setPost({ post }) {
    this.post[post.slug] = post;
  }

  setPostSummaryList({ postSummaryList }) {
    this.postSummaryList = postSummaryList;
  }

  setPostCount({ postCount }) {
    this.postCount = postCount;
  }

  setPage({ page }) {
    this.page = page;
  }

  setPageSize({ pageSize }) {
    this.pageSize = pageSize;
  }

  setPageCount({ pageCount }) {
    this.pageCount = pageCount;
  }
}

const cmsPostStore = new CmsPostStore();

export default cmsPostStore;
