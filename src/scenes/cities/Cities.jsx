import React from "react";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar} from "@mui/x-data-grid";

import Header from "../../components/Header";
import { getColors } from "../../theme";

function Cities() {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const columns = [
        {field: "id"},
        {field: "name", headerName: "Город"}
    ];

    const [cities, setCities] = useState([]);
    useEffect(()=>{
        fetch("https://bot-dev-domain.com:444/cities")
            .then(response => response.json())
            .then(data => {
                setCities(data);
            })
    }, []);

    return(
        <Box m="20px">
            <Header title="Город" subtitle="Список городов доступных в системе" />
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
                    rows={cities} 
                    slots={{toolbar: GridToolbar}}
                    columnVisibilityModel={{id: false}}
                />
            </Box>
        </Box>
    );
};

export default Cities;