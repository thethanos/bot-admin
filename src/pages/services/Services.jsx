import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/global/Header";
import Toolbar from "../../components/GridToolbar";
import { Actions } from "../../utils/common";
import ServiceForm from "../../components/modalforms/ServiceForm";
import useLoadGridDataHook from "../../hooks/useLoadGridDataHook";
import { GridStyler } from "../../components/GridStyler";

const columns = [
    {field: "id"},
    {field: "catID"},
    {field: "catName", headerName: "Категория", flex: 1},
    {field: "name", headerName: "Услуга", flex: 1},
];

function Services() {
    const [tbActionState, setTbActionState] = useState({open: false, action: Actions.UPDATE});
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [catState, setCatState] = useState({category: {value: 0}});
    const [service, setService] = useState({value: ""});
    const services = useLoadGridDataHook("https://bot-dev-domain.com:1444/services", tbActionState, setTbActionState);

    const onAddBtn = () => {
        setCatState({category: {value: 0}});
        setService({value: ""});
        setTbActionState({...tbActionState, open: true})
    };

    const onEditBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        let service = services.find((value)=>{
            return value.id === rowSelectionModel[0]
        });
        setCatState({category: {value: service.catID}});
        setService({id: service.id, value: service.name});
        setTbActionState({...tbActionState, open: true})
    };

    const onDeleteBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        
        let serviceID = rowSelectionModel[0];
        fetch(`https://bot-dev-domain.com:1444/services/${serviceID}`, {
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
            <Header title="Услуга" subtitle="Список услуг доступных в системе" />
            { tbActionState.open && 
                <ServiceForm 
                    catState={catState} 
                    setCatState={setCatState} 
                    service={service}
                    setService={setService} 
                    actionState={tbActionState} 
                    setActionState={setTbActionState} 
                />
            }  
            <GridStyler> 
                <DataGrid
                    columns={columns}
                    rows={services}
                    slots={{toolbar: CustomToolbar}}
                    columnVisibilityModel={{id:false, catID: false}}
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                />
            </GridStyler>
        </Box>
    );
};

export default Services;