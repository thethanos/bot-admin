import React from "react";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getColors } from "../../theme";
import Header from "../../components/Header";

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

    const [masters, setMasters] = useState([]);
    useEffect(()=>{
        fetch("https://bot-dev-domain.com:444/masters")
            .then(response => response.json()) 
            .then(data => {
                setMasters(data);
            })
    }, []);

    return (
        <Box m="20px">
            <Header title="Мастер" subtitle="Список мастеров зарегистрированных в системе" />
            <Box height="75vh" 
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none"
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
            }}>
                <DataGrid 
                    columns={columns}
                    rows={masters}
                    slots={{toolbar: GridToolbar}}
                    columnVisibilityModel={{id: false}}
                />
            </Box>
        </Box>
    );
};

export default Masters;