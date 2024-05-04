const deepEqual = require('deep-equal');

export const EditStatus = {
    DEFAULT: 0,
    EDITED: 1,
    DELETED: 2,
};

export const ImageType = {
    NEW: 0,
    FROM_SERVER: 1,
}

export class ImageMetaData {
    constructor(url, type = ImageType.FROM_SERVER, status = EditStatus.DEFAULT) {
        this.url = url;
        this.croppedArea = { x: 0, y: 0, height: 0, width: 0};
        this.croppedAreaPixels = { x: 0, y: 0, height: 0, width: 0};
        this.cropperPosition = {x: 0, y: 0};
        this.zoomValue = 1;
        this.type = type;
        this.status = status;
    }
};

function getEditedImages(images) {
    return images.filter((image) => {
        if (image.status !== EditStatus.EDITED) {
            return false;
        }
        return !deepEqual(image, ImageMetaData(image.url, ImageType.FROM_SERVER, EditStatus.EDITED));
    })
}

function getAddedImages(images) {
    return images.filter((image) => {
        return image.type === ImageType.NEW;
    });
}

function getDeletedImages(images) {
    return images.filter((image) => {
        return image.status === EditStatus.DELETED;
    });
}

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
});

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */
export default async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      console.log(file);
      resolve(URL.createObjectURL(file));
    }, "image/jpeg");
  });
}