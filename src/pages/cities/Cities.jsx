import React from "react";
import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddCityForm from "../../components/modalforms/AddCityForm";
import Toolbar from "../../components/GridToolbar";
import Header from "../../components/global/Header";
import { getColors } from "../../services/providers/theme";
import { Actions } from "../../utils/common";
import useLoadGridDataHook from "../../hooks/useLoadGridDataHook";
import { columns, getGridStyle } from "./gridsettings.js";


function Cities() {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const [tbActionState, setTbActionState] = useState({open: false, action: Actions.UPDATE});
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [city, setCity] = useState({});
    const cities = useLoadGridDataHook("https://bot-dev-domain.com:1444/cities", tbActionState, setTbActionState);
    
    const onAddBtn = () => {
        setCity({});
        setTbActionState({...tbActionState, open: true})
    };

    const onEditBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        let city = cities.find((value)=>{
            return value.id === rowSelectionModel[0]
        });
        setCity({id: city.id, value: city.name});
        setTbActionState({...tbActionState, open: true})
    };

    const onDeleteBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        
        let cityID = rowSelectionModel[0];
        fetch(`https://bot-dev-domain.com:1444/cities/${cityID}`, {
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
            <Header title="Город" subtitle="Список городов доступных в системе" />
            <Box height="75vh" sx={getGridStyle(colors)}>
                { tbActionState.open && 
                    <AddCityForm 
                        city={city} 
                        setCity={setCity} 
                        actionState={tbActionState} 
                        setActionState={setTbActionState} 
                    />
                }
                <DataGrid
                    columns={columns}
                    rows={cities} 
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

export default Cities;