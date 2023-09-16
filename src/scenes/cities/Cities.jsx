import React from "react";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AddCityForm } from "../modalforms/ModalForms"
import Toolbar from "../../components/GridToolbar";
import Header from "../../components/Header";
import { getColors } from "../../theme";
import { Answers } from "../../common";

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
        {field: "name", headerName: "Город"}
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

    const [cities, setCities] = useState([]);
    
    useEffect(()=>{
        if (dialogState.answer !== Answers.CONFIRM) {
            return
        }
        fetch("https://bot-dev-domain.com:444/cities")
        .then(response => response.json())
        .then(data => {
            setCities(data);
            setDialogState({...dialogState, answer: Answers.DEFAULT})
        })
        .catch(err => {
            console.log(err);
        })
    }, [dialogState.answer]);

    return(
        <Box m="20px">
            <Header title="Город" subtitle="Список городов доступных в системе" />
            <Box height="75vh" sx={getGridStyle(colors)}>
                <AddCityForm dialogState={dialogState} setDialogState={setDialogState}/>
                <DataGrid
                    columns={columns}
                    rows={cities} 
                    slots={{toolbar: CustomToolbar}}
                    columnVisibilityModel={{id: false}}
                />
            </Box>
        </Box>
    );
};

export default Cities;