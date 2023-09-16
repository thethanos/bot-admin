import React from "react";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Header from "../../components/Header";
import Toolbar from "../../components/GridToolbar";
import { getColors } from "../../theme";
import { Answers } from "../../common";
import { AddServiceForm } from "../modalforms/ModalForms";

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

function Services() {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const columns = [
        {field: "id", headerName:"id"},
        {field: "catName", headerName: "Категория", flex: 1},
        {field: "name", headerName: "Услуга", flex: 1},
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

    const [services, setServices] = useState([]);
    useEffect(() => {
        if (dialogState.answer !== Answers.CONFIRM) {
            return
        }
        fetch("https://bot-dev-domain.com:444/services")
        .then(result => result.json())
        .then(data => {
            setServices(data);
            setDialogState({...dialogState, answer: Answers.DEFAULT})
        })
        .catch(err => {
            console.log(err);
        })
    }, [dialogState.answer])

    return(
        <Box m="20px">
            <Header title="Услуга" subtitle="Список услуг доступных в системе" />
            <Box height="75vh" sx={getGridStyle(colors)}>
                <AddServiceForm dialogState={dialogState} setDialogState={setDialogState} />
                <DataGrid
                    columns={columns}
                    rows={services}
                    slots={{toolbar: CustomToolbar}}
                    columnVisibilityModel={{id:false}}
                />
            </Box>
        </Box>
    );
};

export default Services;