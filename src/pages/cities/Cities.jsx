import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CityForm from "../../components/modalforms/CityForm";
import Toolbar from "../../components/GridToolbar";
import Header from "../../components/global/Header";
import { Actions } from "../../utils/common";
import useLoadGridDataHook from "../../hooks/useLoadGridDataHook";
import { GridStyler } from "../../components/GridStyler";

const columns = [
    {field: "id"},
    {field: "name", headerName: "Город", flex: 1}
];

function Cities() {
    const [tbActionState, setTbActionState] = useState({open: false, action: Actions.UPDATE});
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [city, setCity] = useState({});
    const cities = useLoadGridDataHook("https://bot-dev-domain.com:1444/cities", tbActionState, setTbActionState);
    
    const onAddBtn = () => {
        setCity({});
        setTbActionState({...tbActionState, open: true})
    };

    const onEditBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        let city = cities.find((value)=>{
            return value.id === rowSelectionModel[0]
        });
        setCity({id: city.id, value: city.name});
        setTbActionState({...tbActionState, open: true})
    };

    const onDeleteBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        
        let cityID = rowSelectionModel[0];
        fetch(`https://bot-dev-domain.com:1444/cities/${cityID}`, {
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

    return(
        <Box m="20px">
            <Header title="Город" subtitle="Список городов доступных в системе" />
            { tbActionState.open && 
                <CityForm 
                    city={city} 
                    setCity={setCity} 
                    actionState={tbActionState} 
                    setActionState={setTbActionState} 
                />
            }
            <GridStyler>
                <DataGrid
                    columns={columns}
                    rows={cities} 
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

export default Cities;