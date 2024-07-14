export class FractalImageListFetchError extends Error {
  constructor(message) {
    super(`Error fetching Fractal Image list: ${message}`);
    this.name = "FractalImageListFetchError";
  }
}

export class FractalImageDataFetchError extends Error {
  constructor(message) {
    super(`Error fetching Fractal Image data: ${message}`);
    this.name = "FractalImageDataFetchError";
  }
}

export class FractalImageCountFetchError extends Error {
  constructor(message) {
    super(`Error fetching Fractal Image count: ${message}`);
    this.name = "FractalImageCountFetchError";
  }
}

export class BlogPostListFetchError extends Error {
  constructor(message) {
    super(`Error fetching Blog Post list: ${message}`);
    this.name = "BlogPostListFetchError";
  }
}

export class BlogPostDataFetchError extends Error {
  constructor(message) {
    super(`Error fetching Blog Post data: ${message}`);
    this.name = "BlogPostDataFetchError";
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

export class PageFetchError extends Error {
  constructor(message) {
    super(`Error fetching Page data: ${message}`);
    this.name = "PageFetchError";
  }
}
