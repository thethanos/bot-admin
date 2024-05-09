import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CategoryForm from "../../components/modalforms/CategoryForm";
import Toolbar from "../../components/GridToolbar";
import Header from "../../components/global/Header";
import { Actions } from "../../utils/common";
import useLoadGridDataHook from "../../hooks/useLoadGridDataHook";
import { GridStyler } from "../../components/GridStyler";

const columns = [
    {field: "id"},
    {field: "name", headerName: "Категория", flex: 1}
];

function Categories() {
    const [tbActionState, setTbActionState] = useState({open: false, action: Actions.UPDATE});
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [category, setCategory] = useState({});
    const categories = useLoadGridDataHook("https://bot-dev-domain.com:1444/services/categories", tbActionState, setTbActionState);
    
    const onAddBtn = () => {
        setCategory({});
        setTbActionState({...tbActionState, open: true})
    };

    const onEditBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        let category = categories.find((value)=>{
            return value.id === rowSelectionModel[0]
        });
        setCategory({id: category.id, value: category.name});
        setTbActionState({...tbActionState, open: true})
    };

    const onDeleteBtn = () => {
        if (rowSelectionModel.length === 0) {
            return;
        }
        
        let categoryID = rowSelectionModel[0];
        fetch(`https://bot-dev-domain.com:1444/services/categories/${categoryID}`, {
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
            <Header title="Категория" subtitle="Список категорий услуг доступных в системе" />
            { tbActionState.open && 
                <CategoryForm 
                    category={category} 
                    setCategory={setCategory} 
                    actionState={tbActionState} 
                    setActionState={setTbActionState}
                />
            }
            <GridStyler>
                <DataGrid
                    columns={columns}
                    rows={categories} 
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

export default Categories;