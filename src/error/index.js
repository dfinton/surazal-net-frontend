export class BlogPostListFetchError extends Error {
  constructor(message) {
    super(`Error fetching Blog Post list: ${message}`);
    this.name = "PostListFetchError";
  }
}

export class BlogPostDataFetchError extends Error {
  constructor(message) {
    super(`Error fetching Blog Post data: ${message}`);
    this.name = "BlogPostFetchError";
  }
}

export class BlogPostCountFetchError extends Error {
  constructor(message) {
    super(`Error fetching Blog Post count: ${message}`);
    this.name = "BlogPostCountFetchError";
  }
}

export class LinkFetchError extends Error {
  constructor(message) {
    super(`Error fetching Link data: ${message}`);
    this.name = "BlogPostCountFetchError";
  }
}
