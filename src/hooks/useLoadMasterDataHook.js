import { useEffect, useReducer } from "react";
import { Reduce, reducer } from "./reducer";

function useLoadMasterDataHook(id) {
    
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
        if (id.length > 0) {

            const setMasterData = async () => {
                try {
                    let data = await fetch("https://bot-dev-domain.com:1444/masters/"+ id);
                    let master = await data.json();
                    
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
            }

            setMasterData();
        }
    }, [id]);

    return [state, dispatch];
};

export default useLoadMasterDataHook;