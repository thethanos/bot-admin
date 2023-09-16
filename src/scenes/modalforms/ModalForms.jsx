import React, { useEffect, useState } from "react";

import { Box, Button, TextField, Stack, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useTheme } from "@emotion/react";
import { getColors } from "../../theme";
import { Actions } from "../../common";

function AddCityForm({actionState, setActionState}) {
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
            setActionState({open: false, action: Actions.UPDATE});
        }).catch(err => {
            console.log("ERROR: ", err);
        })
    };

    const onCancel = () => {
        setActionState({open: false, action: Actions.DEFAULT});
    };  

    return (
        <Dialog open={actionState.open} fullWidth>
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

const SelectServiceCategory = ({selected, setSelected}) => {

    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        fetch("https://bot-dev-domain.com:444/services/categories")
        .then(response => response.json())
        .then(data => {
            setCategories(data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <Box>
            <Select variant="filled" fullWidth value={selected} onChange={handleChange}>
                <MenuItem value={0} disabled>Категория</MenuItem>
                {
                    categories && categories.map((item) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                }
            </Select>
        </Box>
    );
};

function AddServiceForm({actionState, setActionState}) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);
    const [service, setService] = useState("");
    const [category, setCategory] = useState(0);

    const onSave = () => {
        const body = JSON.stringify({ catID: category, name: service });
        fetch("https://bot-dev-domain.com:444/services", {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: body
        }).then(()=>{
            setService("");
            setCategory(0);
            setActionState({open: false, action: Actions.UPDATE});
        }).catch(err => {
            console.log("ERROR: ", err);
        })
    };

    const onCancel = () => {
        setActionState({open: false, action: Actions.DEFAULT});
    }; 

    return (
        <Dialog open={actionState.open} fullWidth>
            <Box sx={{background: colors.primary[400]}}>
                <DialogTitle>Добавить услугу</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <SelectServiceCategory selected={category} setSelected={setCategory}/>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Услуга"
                            value={service}
                            onChange={(e)=>setService(e.target.value)}
                            name="service"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{margin: "0 15px 15px 0"}}>
                    <Button onClick={onCancel} color="secondary" variant="contained">Отмена</Button>
                    <Button onClick={onSave} color="secondary" variant="contained">Добавить</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
};

function AddMasterForm({actionState, setActionState}) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const onSave = () => {

    };

    const onCancel = () => {
        setActionState({open: false, action: Actions.DEFAULT});
    };

    return (
        <Dialog open={actionState.open} fullWidth>
            <Box sx={{background: colors.primary[400]}}>
                <DialogTitle>Добавить мастера</DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions sx={{margin: "0 15px 15px 0"}}>
                    <Button onClick={onCancel} color="secondary" variant="contained">Отмена</Button>
                    <Button onClick={onSave} color="secondary" variant="contained">Добавить</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export { AddMasterForm, AddCityForm, AddServiceForm };