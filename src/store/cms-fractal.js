import { makeObservable, observable, action } from "mobx";

import {
  FractalImageListFetchError,
  FractalImageDataFetchError,
  FractalImageCountFetchError,
} from "@/error";

import cms from "@/service/cms";

class FractalImageStore {
  image = {};
  imagePendingRequests = new Set();
  imageCount = undefined;
  imageCountPendingRequest = false;
  imageSummaryList = [];

  constructor() {
    makeObservable(this, {
      image: observable,
      imageCount: observable,
      imageSummaryList: observable,
      fetchImage: action,
      fetchImageCount: action,
      fetchImageSummaryList: action,
      setImage: action,
      setImageCount: action,
      setImageSummaryList: action,
    });
  }

  async fetchImage({ image }) {
    if (!image || this.image[image] || this.imagePendingRequests.has(image)) {
      return;
    }

    this.imagePendingRequests.add(image);

    let data;

    try {
      data = await cms(`
        {
          fractal(
            where: {
              slug: "${image}"
            }
          ) {
            slug
            altText
            name
            thumbnail {
              file {
                url
              }
            }
            small {
              file {
                url
              }
            }
            medium {
              file {
                url
              }
            }
            large {
              file {
                url
              }
            }
          }
        }
      `);
    } catch (error) {
      throw new FractalImageDataFetchError(error.message);
    } finally {
      this.imagePendingRequests.delete(image);
    }

    const imageData = data?.data?.fractal;

    if (!imageData) {
      return;
    }

    this.setImage({ imageData });
  }

  async fetchImageCount() {
    if (this.imageCount !== undefined || this.imageCountPendingRequest) {
      return;
    }

    this.imageCountPendingRequest = true;

    let data;

    try {
      data = await cms(`
        {
          fractalsCount
        }
      `);
    } catch (error) {
      throw new FractalImageCountFetchError(error.message);
    } finally {
      this.imageCountPendingRequest = false;
    }

    const imageCount = data?.data?.fractalsCount ?? 0;

    this.setImageCount({ imageCount });
  }

  async fetchImageSummaryList({ page, pageSize }) {
    const take = pageSize;
    const skip = (page - 1) * pageSize;

    let data;

    try {
      data = await cms(`
        {
          fractals(
            orderBy: [{
              createdAt: desc
            }]
            take: ${take}
            skip: ${skip}
          ) {
            slug
            name
            altText
            thumbnail {
              slug
              file {
                url
              }
            }
          }
        }
      `);
    } catch (error) {
      throw new FractalImageListFetchError(error.message);
    }

    const imageSummaryList = data?.data?.fractals ?? [];

    this.setImageSummaryList({ imageSummaryList });
  }

  setImage({ imageData }) {
    this.image[imageData.slug] = imageData;
  }

  setImageCount({ imageCount }) {
    this.imageCount = imageCount;
  }

  setImageSummaryList({ imageSummaryList }) {
    this.imageSummaryList = imageSummaryList;
  }
}

const fractalImageStore = new FractalImageStore();

export default fractalImageStore;
