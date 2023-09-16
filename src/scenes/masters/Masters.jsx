import React from "react";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getColors } from "../../theme";
import Toolbar from "../../components/GridToolbar";
import Header from "../../components/Header";
import { Answers } from "../../common";
import { AddMasterForm } from "../modalforms/ModalForms";

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

    const [dialogState, setDialogState] = useState({open: false, answer: Answers.CONFIRM});
    
    const onAddBtn = () => {
        setDialogState({...dialogState, open: true})
    };

    const onDeleteBtn = () => {

    };

    const CustomToolbar =  () => (
        <Toolbar onAddBtn={onAddBtn} onDeleteBtn={onDeleteBtn}/>
    );

    const [masters, setMasters] = useState([]);
    useEffect(()=>{
        fetch("https://bot-dev-domain.com:444/masters")
            .then(response => response.json()) 
            .then(data => {
                setMasters(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Box m="20px">
            <Header title="Мастер" subtitle="Список мастеров зарегистрированных в системе" />
            <Box height="75vh" sx={getGridStyle(colors)}>
                <AddMasterForm dialogState={dialogState} setDialogState={setDialogState} />
                <DataGrid
                    columns={columns}
                    rows={masters}
                    slots={{toolbar: CustomToolbar}}
                    columnVisibilityModel={{id: false}}
                />
            </Box>
        </Box>
    );
};

export default Masters;