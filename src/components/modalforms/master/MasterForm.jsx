import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { getColors } from "../../../services/providers/theme";
import { Actions } from "../../../utils/common";
import { Reduce } from "../../../hooks/reducer";

import CitySelect from "../../select/CitySelect.jsx";
import ServiceCategorySelect from "../../select/ServiceCategorySelect";
import ServicesSelect from "../../select/ServicesSelect";
import ImageEditor from "./ImageEditor";

import { Mode, validate } from "./validator";
import { uploadUserData, uploadUserImages } from "./upload";
import useLoadMasterDataHook from "../../../hooks/useLoadMasterDataHook";
import { ImageMetaData } from "./images";

const dummyImages = [
    "https://bot-dev-domain.com:9000/f2bd1e0d-00cb-4750-b56e-65965828d674/220325case013.jpg",
    "https://bot-dev-domain.com:9000/f2bd1e0d-00cb-4750-b56e-65965828d674/Cat-with-Sunglasses-Background.jpg",
    "https://bot-dev-domain.com:9000/f2bd1e0d-00cb-4750-b56e-65965828d674/images.jpeg"
];

function MasterForm({ currentMasterID, actionState, setActionState }) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const mode = currentMasterID.length > 0?Mode.EDIT:Mode.CREATE;

    const [state, dispatch] = useLoadMasterDataHook(currentMasterID);
    const [imageEditOpen, setImageEditOpen] = useState(false);
    const [imagesState, setImagesState] = useState([]);
    useEffect(()=> {
        if (mode === Mode.CREATE) {
            return;
        }
        let tempState = [];
        for (let i = 0; i < dummyImages.length; i++) {
            tempState.push(new ImageMetaData(dummyImages[i]));
        }
        setImagesState(tempState);
    }, []);

    const onSave = () => {
        const [valid, error] = validate(state, mode);
        if (!valid) {
            dispatch(error);
            return;
        }

        uploadUserData(currentMasterID, state, mode === Mode.CREATE?"POST":"PUT")
        .then(() => {
            dispatch({ type: Reduce.ResetState });
            setActionState({ open: false, action: Actions.UPDATE });
            uploadUserImages(imagesState);
        })
        .catch(err => {
            console.log("uploadUserData: ", error)
        });
    };

    const onCancel = () => {
        dispatch({ type: Reduce.ResetState });
        setActionState({ open: false, action: Actions.DEFAULT });
    };
    
    return (
        <React.Fragment>
            { imageEditOpen && <ImageEditor 
                open={imageEditOpen} 
                setOpen={setImageEditOpen}
                images={imagesState}
                setImages={setImagesState}
                />
            }
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
                        <Button 
                            sx={{color: "white"}} 
                            onClick={()=>setImageEditOpen(true)}
                        >Выберите фото</Button>
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
        </React.Fragment>
    );
};

export default MasterForm;