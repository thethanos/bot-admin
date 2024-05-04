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
    constructor(name, url, type = ImageType.FROM_SERVER, status = EditStatus.DEFAULT) {
        this.name = name;
        this.url = url;
        this.croppedArea = { x: 0, y: 0, height: 0, width: 0};
        this.croppedAreaPixels = { x: 0, y: 0, height: 0, width: 0};
        this.cropperPosition = {x: 0, y: 0};
        this.zoomValue = 1;
        this.type = type;
        this.status = status;
    }
    
    clone(image) {
        this.name = image.name;
        this.url = image.url;
        this.croppedArea = image.croppedArea;
        this.croppedAreaPixels = image.croppedAreaPixels;
        this.cropperPosition = image.cropperPosition;
        this.zoomValue = image.zoomValue;
        this.type = image.type;
        this.status = image.status;
    }
    
    setZoom(zoom) { this.zoomValue = zoom; }
    setStatus(status) { this.status = status; }
    setCroppedPosition(point) { this.cropperPosition = point; }
    setCroppedArea(croppedArea) { this.croppedArea = croppedArea; }
    setCroppedAreaPixels(croppedPixels) { this.croppedAreaPixels = croppedPixels; }
};

export function getEditedImages(images) {
    return images.filter((image) => {
        return image.status === EditStatus.EDITED && image.type !== ImageType.NEW;
    })
}

export function getAddedImages(images) {
    return images.filter((image) => {
        return image.type === ImageType.NEW;
    });
}

export function getDeletedImages(images) {
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

export async function getImage(imageSrc) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext('2d')
  
    if (!context) {
      return null
    }
  
    // Set the size of the cropped canvas
    canvas.width = image.width
    canvas.height = image.height
  
    // Draw the cropped image onto the new canvas
    context.drawImage(image, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        resolve(file)
      }, 'image/jpeg')
    })
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */
export async function getCroppedImage(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const croppedCtx = canvas.getContext('2d')

  if (!croppedCtx) {
    return null
  }

  // Set the size of the cropped canvas
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(file)
    }, 'image/jpeg')
  })
}