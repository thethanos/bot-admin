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

function AddCityForm({city, setCity, actionState, setActionState}) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const onSave = () => {
        if (!city.value) {
            setCity({...city, error: true, help: "Обязательное поле"});
            return;
        }
        const body = JSON.stringify({
            id: city.id, 
            name: city.value 
        });
        fetch("https://bot-dev-domain.com:1444/cities", {
            method: !city.id?"POST":"PUT",
            headers: { "Content-Type" : "application/json"},
            body: body
        }).then(()=>{
            setCity({});
            setActionState({open: false, action: Actions.UPDATE});
        }).catch(err => {
            console.log("ERROR: ", err);
        })
    };

    const onCancel = () => {
        setCity({});
        setActionState({open: false, action: Actions.DEFAULT});
    };  

    return (
        <Dialog open={actionState.open} fullWidth>
            <Box sx={{background: colors.primary[400]}}>
                <DialogTitle>Город</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        variant="filled"
                        label="Город"
                        value={city.value}
                        error={city.error}
                        helperText={city.help}
                        onChange={(event)=>setCity({...city, value: event.target.value})}
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

export default AddCityForm;