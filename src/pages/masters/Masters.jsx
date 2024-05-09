import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Toolbar from "../../components/GridToolbar";
import Header from "../../components/global/Header";
import { Actions } from "../../utils/common";
import MasterForm from "../../components/modalforms/master/MasterForm";
import useLoadGridDataHook from "../../hooks/useLoadGridDataHook";
import { GridStyler } from "../../components/GridStyler";

const columns = [
    { field: "id"},
    { field: "name", headerName: "ФИО", flex: 1},
    { field: "cityName", headerName: "Город", flex: 1},
    { field: "servCatName", headerName: "Услуги", flex: 1},
    { field: "regDate", headerName: "Дата", flex: 0.5}
];

function Masters() {
    const [tbActionState, setTbActionState] = useState({open: false, action: Actions.UPDATE});
    const [currentMasterID, setCurrentMasterID] = useState("");
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const masters = useLoadGridDataHook("https://bot-dev-domain.com:1444/masters/admin", tbActionState, setTbActionState);

    const onAddBtn = () => {
        setCurrentMasterID("");
        setTbActionState({...tbActionState, open: true});
    };

    const onEditBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        setCurrentMasterID(rowSelectionModel[0]);
        setTbActionState({...tbActionState, open: true});
    }

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
        <Toolbar onAddBtn={onAddBtn} onEditBtn={onEditBtn} onDeleteBtn={onDeleteBtn}/>
    );

    return (
        <Box m="20px">
            <Header title="Мастер" subtitle="Список мастеров зарегистрированных в системе" />
            { tbActionState.open && 
                <MasterForm
                    currentMasterID={currentMasterID}
                    actionState={tbActionState} 
                    setActionState={setTbActionState} 
                /> 
            }
            <GridStyler>
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
            </GridStyler>
        </Box>
    );
};

export default Masters;