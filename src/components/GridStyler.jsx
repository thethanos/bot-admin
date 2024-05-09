import { Box, useTheme } from "@mui/material";
import { getColors } from "../services/providers/theme";

export const getGridStyle = (colors) => {
    return {
        "& .MuiDataGrid-root": {
            border: "none",
            "--DataGrid-containerBackground" : "transparent"
        },
        "& .MuiDataGrid-columnHeader:focus-within": {
            outline: "none !important"
        },
        "& .MuiDataGrid-cell": {
            border: "none",
        },
        "& .MuiDataGrid-cell:focus-within": {
            outline: "none !important"
        },
        "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400]
        },
        "& .MuiDataGrid-topContainer": {
            backgroundColor: colors.blueAccent[700]
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

export function GridStyler({children}) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    return (
        <Box height="75vh" sx={getGridStyle(colors)}>
            {children}
        </Box>
    );
}