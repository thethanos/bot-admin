import React, { useState } from "react";

import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useTheme } from "@emotion/react";
import { getColors } from "../../theme";
import { Answers } from "../../common";

function AddCityForm({dialogState, setDialogState}) {

    const theme = useTheme();
    const colors = getColors(theme.palette.mode);
    const [city, setCity] = useState("");

    const onSave = () => {
        const body = JSON.stringify({ name: city });
        fetch("https://bot-dev-domain.com:444/cities", {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: body
        }).then(()=>{
            setCity("");
            setDialogState({open: false, answer: Answers.CONFIRM});
        }).catch(err => {
            console.log("ERROR: ", err);
        })
    };

    const onCancel = () => {
        setDialogState({open: false, answer: Answers.REJECT});
    };  

    return (
        <Dialog open={dialogState.open} fullWidth>
            <Box sx={{background: colors.primary[400]}}>
                <DialogTitle>Добавить город</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Город"
                        value={city}
                        onChange={(e)=>setCity(e.target.value)}
                        name="city"
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

function AddServiceForm({dialogState, setDialogState}) {

    const theme = useTheme();
    const colors = getColors(theme.palette.mode);
    const [service, setService] = useState("");

    const onSave = () => {
        const body = JSON.stringify({ name: service });
        fetch("https://bot-dev-domain.com:444/services", {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: body
        }).then(()=>{
            setService("");
            setDialogState({open: false, answer: Answers.CONFIRM});
        }).catch(err => {
            console.log("ERROR: ", err);
        })
    };

    const onCancel = () => {
        setDialogState({open: false, answer: Answers.REJECT});
    }; 

    return (
        <Dialog open={dialogState.open} fullWidth>
            <DialogTitle>Добавить услугу</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Услуга"
                    value={service}
                    onChange={(e)=>setService(e.target.value)}
                    name="service"
                />
            </DialogContent>
            <DialogActions sx={{margin: "0 15px 15px 0"}}>
                <Button onClick={onCancel} color="secondary" variant="contained">Отмена</Button>
                <Button onClick={onSave} color="secondary" variant="contained">Добавить</Button>
            </DialogActions>
        </Dialog>
    )
};

export { AddCityForm, AddServiceForm };