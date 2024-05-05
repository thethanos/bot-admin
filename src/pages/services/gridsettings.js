export const columns = [
    {field: "id"},
    {field: "catID"},
    {field: "catName", headerName: "Категория", flex: 1},
    {field: "name", headerName: "Услуга", flex: 1},
];

export const getGridStyle = (colors) => {
    return {
        "& .MuiDataGrid-root": {
            border: "none"
        },
        "& .MuiDataGrid-cell": {
            border: "none"
        },
        "& .MuiDataGrid-cell:focus-within": {
            outline: "none !important"
        },
        "& .MuiDataGrid-columnHeader:focus-within": {
            outline: "none !important"
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