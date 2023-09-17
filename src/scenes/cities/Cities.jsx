import React from "react";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AddCityForm } from "../modalforms/ModalForms"
import Toolbar from "../../components/GridToolbar";
import Header from "../../components/Header";
import { getColors } from "../../theme";
import { Actions } from "../../common";

const getGridStyle = (colors) => {
        return {
            "& .MuiDataGrid-root": {
                border: "none"
            },
            "& .MuiDataGrid-cell": {
                border: "none"
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                border: "none"
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400]
            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700]
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`
            }
    }
};

function Cities() {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const columns = [
        {field: "id"},
        {field: "name", headerName: "Город", flex: 1}
    ];

    const [tbActionState, setTbActionState] = useState({open: false, action: Actions.UPDATE});
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    
    const onAddBtn = () => {
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
        <Toolbar onAddBtn={onAddBtn} onDeleteBtn={onDeleteBtn}/>
    );

    const [cities, setCities] = useState([]);
    
    useEffect(()=>{
        if (tbActionState.action !== Actions.UPDATE) {
            return
        }
        fetch("https://bot-dev-domain.com:1444/cities")
        .then(response => response.json())
        .then(data => {
            setCities(data);
            setTbActionState({...tbActionState, action: Actions.DEFAULT})
        })
        .catch(err => {
            console.log(err);
        })
    }, [tbActionState]);

    return(
        <Box m="20px">
            <Header title="Город" subtitle="Список городов доступных в системе" />
            <Box height="75vh" sx={getGridStyle(colors)}>
                <AddCityForm actionState={tbActionState} setActionState={setTbActionState}/>
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