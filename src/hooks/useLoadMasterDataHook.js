import { useEffect, useReducer, useState } from "react";
import { Reduce, reducer } from "./reducer";

function useLoadMasterDataHook(id) {
    
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, {
        id: { value: id },
        name: { value: "" },
        city: { value: "0" },
        category: { value: "0" },
        services: { values: ["0"] },
        description: { value: "" },
        contact: { value: "" },
    });

    useEffect(()=> {
        if (id.length !== 0) {

            const loadMasterData = async () => {
                setIsLoading(true);
                try {
                    let masterResponse = await fetch(`https://bot-dev-domain.com:1444/masters/${id}`);
                    let master = await masterResponse.json();
                    
                    let newState = {
                        id: { value: id},
                        name: { value: master.name },
                        city: { value: master.cityID },
                        category: { value: master.servCatID },
                        services: { values: master.servIDs },
                        description: { value: master.description },
                        contact: { value: master.contact },
                    }
    
                    dispatch({type: Reduce.UpdateAll, value : newState });
                }
                catch(err) {
                    console.log("ERROR: ", err)
                }
                setIsLoading(false);
            }

            loadMasterData();
        }
    }, [id]);

    return [isLoading, state, dispatch];
};

export default useLoadMasterDataHook;