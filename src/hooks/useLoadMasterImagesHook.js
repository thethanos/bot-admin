import { useEffect, useState } from "react";
import { ImageMetaData } from "../utils/images";

function useLoadMasterImagesHook(id) {
    const [imagesState, setImagesState] = useState([]);

    useEffect(()=> {
        if (id.length !== 0) {
            const loadImages = async () => {
                let imagesResponse = await fetch(`https://bot-dev-domain.com:1444/masters/${id}/images`)
                let images = await imagesResponse.json();
    
                let tempState = [];
                for (let i = 0; i < images.length; i++) {
                    tempState.push(new ImageMetaData(images[i].name, images[i].url));
                }
    
                setImagesState(tempState);
            }

            loadImages();
        }
    }, [id]);

    return [imagesState, setImagesState]
}

export default useLoadMasterImagesHook;