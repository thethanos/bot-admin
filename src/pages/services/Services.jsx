import React from "react";
import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Header from "../../components/global/Header";
import Toolbar from "../../components/GridToolbar";
import { getColors } from "../../services/providers/theme";
import { Actions } from "../../utils/common";
import AddServiceForm from "../../components/modalforms/AddServiceForm";
import useLoadGridDataHook from "../../hooks/useLoadGridDataHook";
import { columns, getGridStyle } from "./gridsettings.js";

function Services() {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const [tbActionState, setTbActionState] = useState({open: false, action: Actions.UPDATE});
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [catState, setCatState] = useState({category: {value: 0}});
    const [service, setService] = useState({value: ""});
    const services = useLoadGridDataHook("https://bot-dev-domain.com:1444/services", tbActionState, setTbActionState);

    const onAddBtn = () => {
        setCatState({category: {value: 0}});
        setService({value: ""});
        setTbActionState({...tbActionState, open: true})
    };

    const onEditBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        let service = services.find((value)=>{
            return value.id === rowSelectionModel[0]
        });
        setCatState({category: {value: service.catID}});
        setService({id: service.id, value: service.name});
        setTbActionState({...tbActionState, open: true})
    };

    const onDeleteBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        
        let serviceID = rowSelectionModel[0];
        fetch(`https://bot-dev-domain.com:1444/services/${serviceID}`, {
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
        <Toolbar onAddBtn={onAddBtn} onEditBtn={onEditBtn} onDeleteBtn={onDeleteBtn}/>
    );

    return(
        <Box m="20px">
            <Header title="Услуга" subtitle="Список услуг доступных в системе" />
            <Box height="75vh" sx={getGridStyle(colors)}>
                { tbActionState.open && 
                    <AddServiceForm 
                        catState={catState} 
                        setCatState={setCatState} 
                        service={service}
                        setService={setService} 
                        actionState={tbActionState} 
                        setActionState={setTbActionState} 
                    />
                }   
                <DataGrid
                    columns={columns}
                    rows={services}
                    slots={{toolbar: CustomToolbar}}
                    columnVisibilityModel={{id:false, catID: false}}
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                />
            </Box>
        </Box>
    );
};

export default Services;