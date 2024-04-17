import React from "react";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getColors } from "../../services/providers/theme";
import Toolbar from "../../components/GridToolbar";
import Header from "../../components/global/Header";
import { Actions } from "../../utils/common";
import AddMasterForm from "../../components/modalforms/AddMasterForm";

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

function Masters() {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const columns = [
        { field: "id"},
        { field: "name", headerName: "ФИО", flex: 1},
        { field: "cityName", headerName: "Город", flex: 1},
        { field: "servCatName", headerName: "Услуги", flex: 1},
        { field: "regDate", headerName: "Дата", flex: 0.5}
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

    const [masters, setMasters] = useState([]);
    useEffect(()=>{
        if (tbActionState.action !== Actions.UPDATE) {
            return
        }
        fetch("https://bot-dev-domain.com:1444/masters")
        .then(response => response.json()) 
        .then(data => {
            setMasters(data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [tbActionState]);

    return (
        <Box m="20px">
            <Header title="Мастер" subtitle="Список мастеров зарегистрированных в системе" />
            <Box height="75vh" sx={getGridStyle(colors)}>
                <AddMasterForm actionState={tbActionState} setActionState={setTbActionState} />
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