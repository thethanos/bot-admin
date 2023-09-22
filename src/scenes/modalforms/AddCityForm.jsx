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

function AddCityForm({actionState, setActionState}) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);
    const [city, setCity] = useState({});

    const onSave = () => {
        if (!city.value) {
            setCity({...city, error: true, help: "Обязательное поле"});
            return;
        }
        const body = JSON.stringify({ name: city.value });
        fetch("https://bot-dev-domain.com:1444/cities", {
            method: "POST",
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
                <DialogTitle>Добавить город</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        variant="filled"
                        label="Город"
                        value={city.value}
                        error={city.error}
                        helperText={city.help}
                        onChange={(event)=>setCity({value: event.target.value})}
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

export default AddCityForm;