import React from "react";
import { Button, Box } from "@mui/material";
import { GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function GridToolbar({ onAddBtn, onEditBtn, onDeleteBtn }) {
    return (
        <React.Fragment>
            <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <GridToolbarFilterButton />
                    <GridToolbarExport />
                </Box>
                <Box>
                    {
                        onAddBtn &&
                        <Button onClick={onAddBtn}>
                            <AddIcon />
                            Добавить
                        </Button>
                    }
                    {
                        onEditBtn && <Button onClick={onEditBtn}>
                            <EditIcon />
                            Изменить
                        </Button>
                    }
                    {
                        onDeleteBtn && <Button onClick={onDeleteBtn}>
                            <DeleteIcon />
                            Удалить
                        </Button>
                    }
                </Box>
            </GridToolbarContainer>
        </React.Fragment>
    );
};

export default GridToolbar;