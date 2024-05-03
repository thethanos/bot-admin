import React from "react";
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
import { getColors } from "../../services/providers/theme";
import { Actions } from "../../utils/common";

function CategoryForm({category, setCategory, actionState, setActionState}) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const onSave = () => {
        if (!category.value) {
            setCategory({...category, error: true, help: "Обязательное поле"});
            return;
        }
        const body = JSON.stringify({ 
            id: category.id,
            name: category.value 
        });
        fetch("https://bot-dev-domain.com:1444/services/categories", {
            method: !category.id?"POST":"PUT",
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
                <DialogTitle>Категория</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        variant="filled"
                        label="Категория"
                        value={category.value}
                        error={category.error}
                        helperText={category.help}
                        onChange={(event)=>setCategory({...category, value: event.target.value})}
                    />
                </DialogContent>
                <DialogActions sx={{margin: "0 15px 15px 0"}}>
                    <Button onClick={onCancel} color="secondary" variant="contained">Отмена</Button>
                    <Button onClick={onSave} color="secondary" variant="contained">Сохранить</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
};

export default CategoryForm;