import React, { useReducer } from "react";
import {
    Box,
    Button,
    TextField,
    Input,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { getColors } from "../../../services/providers/theme";
import { Actions } from "../../../utils/common";
import { Reduce, reducer } from "./reducer";

import CitySelect from "../../select/CitySelect";
import ServiceCategorySelect from "../../select/ServiceCategorySelect";
import ServicesSelect from "../../select/ServicesSelect";

import { validate } from "./validator.js";

function AddMasterForm({ actionState, setActionState }) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const [state, dispatch] = useReducer(reducer, {
        name: { value: "" },
        city: { value: "0" },
        category: { value: "0" },
        services: { values: ["0"] },
        description: { value: "" },
        images: { values: [] },
        contact: { value: "" },
    });

    const onSave = () => {
        const [valid, error] = validate(state);
        if (!valid) {
            dispatch(error);
            return;
        }
        const body = JSON.stringify({
            name: state.name.value,
            cityID: state.city.value,
            servCatID: state.category.value,
            servIDs: state.services.values,
            description: state.description.value,
            contact: state.contact.value,
        });
        fetch("https://bot-dev-domain.com:1444/masters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body
        })
            .then(response => response.json())
            .then(async (data) => {
                const master_id = data.id;
                let promises = [];
                for (let image of state.images.values) {
                    const formData = new FormData();
                    formData.append("file", image);
                    promises.push(
                        fetch(`https://bot-dev-domain.com:1444/masters/images/${master_id}`, {
                            method: "POST",
                            body: formData,
                        })
                    );
                }
                await Promise.all(promises);
            })
            .then(() => {
                dispatch({ type: Reduce.ResetState });
                setActionState({ open: false, action: Actions.UPDATE });
            })
            .catch(err => {
                console.log(err);
            })
    };

    const onCancel = () => {
        dispatch({ type: Reduce.ResetState });
        setActionState({ open: false, action: Actions.DEFAULT });
    };
    
    return (
        <Dialog open={actionState.open} fullWidth>
            <Box sx={{ background: colors.primary[400] }}>
                <DialogTitle>Мастер</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            required
                            fullWidth
                            variant="filled"
                            label="ФИО"
                            value={state.name.value}
                            error={state.name.error}
                            helperText={state.name.help}
                            onChange={(event) => dispatch({ type: Reduce.UpdateName, value: { value: event.target.value } })}
                        />
                        <CitySelect
                            selected={state.city}
                            setSelected={(city) => dispatch({ type: Reduce.UpdateCity, value: city })} />
                        <ServiceCategorySelect
                            selected={state.category}
                            setSelected={(category) => { dispatch({ type: Reduce.UpdateCategory, value: category }) }}
                        />
                        <ServicesSelect
                            category={state.category.value}
                            selected={state.services}
                            setSelected={(services) => { dispatch({ type: Reduce.UpdateServices, value: services }) }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            label="Описание"
                            value={state.description.value}
                            error={state.description.error}
                            helperText={state.description.help}
                            onChange={(event) => dispatch({ type: Reduce.UpdateDescription, value: { value: event.target.value } })}
                            multiline
                        />
                        <Input
                            type="file"
                            inputProps={{ multiple: true }}
                            files={state.images.values}
                            error={state.images.error}
                            onChange={(event) => dispatch({ type: Reduce.UpdateImages, value: { values: event.target.files } })}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            label="Контактные данные"
                            value={state.contact.value}
                            error={state.contact.error}
                            helperText={state.contact.help}
                            onChange={(event) => dispatch({ type: Reduce.UpdateContact, value: { value: event.target.value } })}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ margin: "0 15px 15px 0" }}>
                    <Button onClick={onCancel} color="secondary" variant="contained">Отмена</Button>
                    <Button onClick={onSave} color="secondary" variant="contained">Сохранить</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default AddMasterForm;