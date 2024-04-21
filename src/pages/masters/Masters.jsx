import React from "react";
import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getColors } from "../../services/providers/theme";
import Toolbar from "../../components/GridToolbar";
import Header from "../../components/global/Header";
import { Actions } from "../../utils/common";
import AddMasterForm from "../../components/modalforms/master/AddMasterForm";
import useLoadGridDataHook from "../../hooks/useLoadGridDataHook";
import { columns, getGridStyle } from "./gridsettings.js";


function Masters() {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const [tbActionState, setTbActionState] = useState({open: false, action: Actions.UPDATE});
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const masters = useLoadGridDataHook("https://bot-dev-domain.com:1444/masters", tbActionState, setTbActionState);

    const onAddBtn = () => {
        setTbActionState({...tbActionState, open: true})
    };

    const onDeleteBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        
        let masterID = rowSelectionModel[0];
        fetch(`https://bot-dev-domain.com:1444/masters/${masterID}`, {
            method: "DELETE",
        })
        .then(()=>{
            setTbActionState({...tbActionState, action: Actions.UPDATE});
        })
        .catch(err => {
            console.log(err);
        })
    };

    const CustomToolbar =  () => (
        <Toolbar onAddBtn={onAddBtn} onDeleteBtn={onDeleteBtn}/>
    );

    return (
        <Box m="20px">
            <Header title="Мастер" subtitle="Список мастеров зарегистрированных в системе" />
            <Box height="75vh" sx={getGridStyle(colors)}>
                <AddMasterForm
                    actionState={tbActionState} 
                    setActionState={setTbActionState} 
                />
                <DataGrid
                    columns={columns}
                    rows={masters}
                    slots={{toolbar: CustomToolbar}}
                    columnVisibilityModel={{id: false}}
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                />
            </Box>
        </Box>
    );
};

export default Masters;