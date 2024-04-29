import { Status } from "../../../utils/common.js";

export default async function uploadUserData(id, state, action) {
    
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
    
    const master_id = response.json().id;
    for (let image of state.images.values) {
        const formData = new FormData();
        formData.append("file", image);
        fetch(`https://bot-dev-domain.com:1444/masters/images/${master_id}`, {
                method: "POST",
                body: formData,
        })
        .catch(err => {
            console.log("uploadUserData: ", err);
        })
    }
}