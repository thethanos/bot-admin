import React, { useState } from "react";
import { 
    Box, 
    Button, 
    TextField, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions 
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { getColors } from "../../theme";
import { Actions } from "../../common";

function AddCategoryForm({actionState, setActionState}) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);
    const [category, setCategory] = useState({});

    const onSave = () => {
        console.log(category);
        if (!category.value) {
            setCategory({...category, error: true, help: "Обязательное поле"});
            return;
        }
        const body = JSON.stringify({ name: category.value });
        fetch("https://bot-dev-domain.com:1444/services/categories", {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: body
        }).then(()=>{
            setCategory({});
            setActionState({open: false, action: Actions.UPDATE});
        }).catch(err => {
            console.log("ERROR: ", err);
        })
    };

    const onCancel = () => {
        setCategory({});
        setActionState({open: false, action: Actions.DEFAULT});
    };  

    return (
        <Dialog open={actionState.open} fullWidth>
            <Box sx={{background: colors.primary[400]}}>
                <DialogTitle>Добавить категорию</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        variant="filled"
                        label="Категория"
                        value={category.value}
                        error={category.error}
                        helperText={category.help}
                        onChange={(event)=>setCategory({value: event.target.value})}
                    />
                </DialogContent>
                <DialogActions sx={{margin: "0 15px 15px 0"}}>
                    <Button onClick={onCancel} color="secondary" variant="contained">Отмена</Button>
                    <Button onClick={onSave} color="secondary" variant="contained">Добавить</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
};

export default AddCategoryForm;