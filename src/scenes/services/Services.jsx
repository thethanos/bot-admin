import React from "react";

import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar} from "@mui/x-data-grid";

import Header from "../../components/Header";
import { getColors } from "../../theme";

function Services() {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const columns = [
        {field: "id"},
        {filed: "servCatName", headerName: "Категория", flex: 1},
        {field: "servName", headerName: "Услуга", flex: 1}
    ];

    const services = [
        {"id" : "123", "name" : "example"}
    ];

    return(
        <Box m="20px">
            <Header title="Услуга" subtitle="Список услуг доступных в системе" />
            <Box height="75vh"
                sx={{
                    "& .MuiDataGrid--root":{
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
                }}
            >
                <DataGrid
                    columns={columns}
                    rows={services}
                    slots={{toolbar: GridToolbar}}
                    columnVisibilityModel={{id: false}}
                />
            </Box>
        </Box>
    );
};

export default Services;