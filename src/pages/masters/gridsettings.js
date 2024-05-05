export const columns = [
    { field: "id"},
    { field: "name", headerName: "ФИО", flex: 1},
    { field: "cityName", headerName: "Город", flex: 1},
    { field: "servCatName", headerName: "Услуги", flex: 1},
    { field: "regDate", headerName: "Дата", flex: 0.5}
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
            outline: "none"
        },
        "& .MuiDataGrid-columnHeader:focus-within": {
            outline: "none"
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