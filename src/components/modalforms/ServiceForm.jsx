import React from "react";
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
import { getColors } from "../../services/providers/theme";
import { Actions } from "../../utils/common";

import ServiceCategorySelect from "../select/ServiceCategorySelect";

function ServiceForm({catState, setCatState, service, setService, actionState, setActionState}) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const onSave = () => {
        if (!catState.category.value) {
            setCatState({category: {...catState.category, error: true, help: "Обязательное поле"}});
            return;
        }
        if (!service.value) {
            setService({...service, error: true, help: "Обязательное поле"})
            return;
        }

        const body = JSON.stringify({ 
            catID: catState.category.value,
            id: service.id, 
            name: service.value 
        });
        fetch("https://bot-dev-domain.com:1444/services", {
            method: !service.id?"POST":"PUT",
            headers: { "Content-Type" : "application/json"},
            body: body
        }).then(()=>{
            setCatState({category: {value: 0}});
            setService({});
            setActionState({open: false, action: Actions.UPDATE});
        }).catch(err => {
            console.log("ERROR: ", err);
        })
    };

    const onCancel = () => {
        setCatState({category: {value: 0}});
        setService({});
        setActionState({open: false, action: Actions.DEFAULT});
    }; 

    return (
        <Dialog open={actionState.open} fullWidth>
            <Box sx={{background: colors.primary[400]}}>
                <DialogTitle>Услуга</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <ServiceCategorySelect 
                            selected={catState.category} 
                            setSelected={(category)=>{setCatState({category: category})}}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="filled"
                            label="Услуга"
                            value={service.value}
                            error={service.error}
                            helperText={service.help}
                            onChange={(event)=>setService({...service, value: event.target.value})}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{margin: "0 15px 15px 0"}}>
                    <Button onClick={onCancel} color="secondary" variant="contained">Отмена</Button>
                    <Button onClick={onSave} color="secondary" variant="contained">Сохранить</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
};

export default ServiceForm;