import { Status } from "../../../utils/common.js";
import { getAddedImages, getDeletedImages, getEditedImages, getCroppedImage, getImage } from "../../../utils/images.js";

export async function uploadUserData(id, state, action) {
    
    const body = JSON.stringify({
        id: id,
        name: state.name.value,
        cityID: state.city.value,
        servCatID: state.category.value,
        servIDs: state.services.values,
        description: state.description.value,
        contact: state.contact.value,
        status: 2, //to be replaced later
    });

    const response = await fetch("https://bot-dev-domain.com:1444/masters", {
        method: action,
        headers: { "Content-Type": "application/json" },
        body: body
    })

    if (response.status !== Status.CREATED && response.status !== Status.OK) {
        throw response.error;
    }

    const json = await response.json();
    return json.id;
}

export function uploadUserImages(id, images) {

    let toDelete = getDeletedImages(images);
    let toUpdate = getEditedImages(images);
    let toUpload = getAddedImages(images);

    for (let image of toDelete) {
        fetch(`https://bot-dev-domain.com:1444/masters/${id}/images/${image.name}`, {
            method: "DELETE"
        })
        .catch(err => {
            console.log("delete image: ", err);
        })
    }

    let updatePromises = []
    for (let image of toUpdate) {
        getCroppedImage(image.url, image.croppedAreaPixels)
        .then(blob => {
            let formData = new FormData();
            formData.append("file", blob);
            updatePromises.push(fetch(`https://bot-dev-domain.com:1444/masters/${id}/images/${image.name}`, {
                method: "PUT",
                body: formData,
            }));
        })
    }
    Promise.all(updatePromises).catch(err => {
        console.log("update images: ", err);
    })

    let uploadPromises = [];
    for (let image of toUpload) {
        getImage(image.url)
        .then(blob => {
            let formData = new FormData();
            formData.append("file", blob);
            uploadPromises.push(fetch(`https://bot-dev-domain.com:1444/masters/${id}/images`, {
                method: "POST",
                body: formData,
            }));
        })
    }
    Promise.all(uploadPromises).catch(err => {
        console.log("upload images: ", err);
    });
}