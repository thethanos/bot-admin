import { useEffect, useState } from "react";
import { Actions } from "../utils/common.js";


function useLoadGridDataHook(url, tbActionState, setTbActionState) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (tbActionState.action !== Actions.UPDATE) {
            return
        }
        fetch(url)
        .then(result => result.json())
        .then(data => {
            setData(data);
            setTbActionState({...tbActionState, action: Actions.DEFAULT})
        })
        .catch(err => {
            console.log(err);
        })
    }, [tbActionState])

    return data;
};

export default useLoadGridDataHook;