import { useEffect, useState } from "react";
import { ImageMetaData } from "../utils/images";

function useLoadMasterImagesHook(id) {
    const [imagesState, setImagesState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        if (id.length !== 0) {
            const loadImages = async () => {
                setIsLoading(true);
                let imagesResponse = await fetch(`https://bot-dev-domain.com:1444/masters/${id}/images`)
                let images = await imagesResponse.json();
    
                let tempState = [];
                for (let i = 0; i < images.length; i++) {
                    tempState.push(new ImageMetaData(images[i].name, images[i].url));
                }
    
                setImagesState(tempState);
                setIsLoading(false);
            }

            loadImages();
        }
    }, [id]);

    return [isLoading, imagesState, setImagesState]
}

export default useLoadMasterImagesHook;