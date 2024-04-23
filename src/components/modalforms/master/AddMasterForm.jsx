import React from "react";
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
import { Reduce } from "../../../hooks/reducer.js";

import CitySelect from "../../select/CitySelect";
import ServiceCategorySelect from "../../select/ServiceCategorySelect";
import ServicesSelect from "../../select/ServicesSelect";

import { Mode, validate } from "./validator.js";
import useLoadMasterDataHook from "../../../hooks/useLoadMasterDataHook";

function AddMasterForm({ currentMasterID, actionState, setActionState }) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const [state, dispatch] = useLoadMasterDataHook(currentMasterID);

    const mode = currentMasterID.length > 0?Mode.EDIT:Mode.CREATE;

    const onSave = () => {
        const [valid, error] = validate(state, mode);
        if (!valid) {
            dispatch(error);
            return;
        }
        const body = JSON.stringify({
            id: currentMasterID,
            name: state.name.value,
            cityID: state.city.value,
            servCatID: state.category.value,
            servIDs: state.services.values,
            description: state.description.value,
            contact: state.contact.value,
            status: 2, //to be replaced later
        });
        fetch("https://bot-dev-domain.com:1444/masters", {
            method: mode === Mode.CREATE?"POST":"PUT",
            headers: { "Content-Type": "application/json" },
            body: body
        })
            .then(response => response.json())
            .then(async (data) => {
                let promises = [];
                for (let image of state.images.values) {
                    const formData = new FormData();
                    formData.append("file", image);
                    promises.push(
                        fetch(`https://bot-dev-domain.com:1444/masters/images/${data.id}`, {
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
                        { mode === Mode.CREATE && 
                            <Input
                                type="file"
                                inputProps={{ multiple: true }}
                                files={state.images.values}
                                error={state.images.error}
                                onChange={(event) => dispatch({ type: Reduce.UpdateImages, value: { values: event.target.files } })}
                            />
                         }
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