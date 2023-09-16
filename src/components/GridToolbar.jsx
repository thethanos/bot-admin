import React from "react";
import { Button, Box} from "@mui/material";
import { GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton} from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function GridToolbar({onAddBtn, onDeleteBtn}) {
    return (
        <React.Fragment>
            <GridToolbarContainer sx={{display: "flex", justifyContent:"space-between"}}>
                <Box>
                    <GridToolbarFilterButton />
                    <GridToolbarExport />
                </Box>
                <Box>
                    <Button onClick={onAddBtn}>
                        <AddIcon />
                        Добавить
                    </Button>
                    <Button onClick={onDeleteBtn}>
                        <DeleteIcon />
                        Удалить
                    </Button>
                </Box>
            </GridToolbarContainer>
        </React.Fragment>
    );
};

export default GridToolbar;