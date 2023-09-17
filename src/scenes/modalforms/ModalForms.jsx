import React, { useEffect, useState } from "react";
import { 
    Box, 
    Button, 
    TextField, 
    Input,
    Stack, 
    Select, 
    MenuItem, 
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
    const [city, setCity] = useState("");

    const onSave = () => {
        const body = JSON.stringify({ name: city });
        fetch("https://bot-dev-domain.com:1444/cities", {
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
                        label="Город"
                        value={city}
                        onChange={(event)=>setCity(event.target.value)}
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

function AddCategoryForm({actionState, setActionState}) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);
    const [category, setCategory] = useState("");

    const onSave = () => {
        const body = JSON.stringify({ name: category });
        fetch("https://bot-dev-domain.com:1444/services/categories", {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: body
        }).then(()=>{
            setCategory("");
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
                <DialogTitle>Добавить категорию</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Категория"
                        value={category}
                        onChange={(event)=>setCategory(event.target.value)}
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

function AddServiceForm({actionState, setActionState}) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);
    const [service, setService] = useState("");
    const [category, setCategory] = useState(0);

    const onSave = () => {
        const body = JSON.stringify({ catID: category, name: service });
        fetch("https://bot-dev-domain.com:1444/services", {
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
                            label="Услуга"
                            value={service}
                            onChange={(event)=>setService(event.target.value)}
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

    const [name, setName] = useState("");
    const [city, setCity] = useState(0);
    const [category, setCategory] = useState(0);
    const [services, setServices] = useState([]);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [contact, setContact] = useState(""); 

    const onSave = () => {
        const body = JSON.stringify({
            name: name,
            cityID: city,
            servCatID: category,
            servIDs: services,
            description: description,
            contact: contact,
        });
        fetch("https://bot-dev-domain.com:1444/masters", {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: body
        })
        .then(response => response.json())
        .then(async (data)=>{
            const master_id = data.id;
            for (let image of images) {
                const formData = new FormData();
                formData.append("file", image);
                await fetch(`https://bot-dev-domain.com:1444/masters/images/${master_id}`, {
                    method: "POST",
                    body: formData,
                })
            }
        })
        .then(()=>{
            setActionState({open: false, action: Actions.UPDATE});
        })
        .catch(err => {
            console.log(err);
        })
    };

    const onCancel = () => {
        setActionState({open: false, action: Actions.DEFAULT});
    };

    return (
        <Dialog open={actionState.open} fullWidth>
            <Box sx={{background: colors.primary[400]}}>
                <DialogTitle>Добавить мастера</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField variant="filled" label="ФИО" fullWidth 
                            value={name} onChange={(event)=>setName(event.target.value)}
                        />
                        <SelectCity selected={city} setSelected={setCity}/>
                        <SelectServiceCategory selected={category} setSelected={setCategory}/>
                        <SelectServices category={category} selected={services} setSelected={setServices}/>
                        <TextField variant="filled" label="Описание" multiline fullWidth
                            value={description} onChange={(event)=>setDescription(event.target.value)}
                        />
                        <Input type="file" inputProps={{ multiple: true }}
                            onChange={(event)=>setImages(event.target.files)}
                        />
                        <TextField variant="filled" label="Контактные данные" fullWidth
                            value={contact} onChange={(event)=>setContact(event.target.value)}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{margin: "0 15px 15px 0"}}>
                    <Button onClick={onCancel} color="secondary" variant="contained">Отмена</Button>
                    <Button onClick={onSave} color="secondary" variant="contained">Добавить</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export { AddCityForm, AddCategoryForm, AddServiceForm, AddMasterForm };

function SelectCity({selected, setSelected}) {

    const [cities, setCities] = useState([]);
    useEffect(()=> {
        fetch("https://bot-dev-domain.com:1444/cities")
        .then(response => response.json())
        .then(data => {
            setCities(data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
 
    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <Select variant="filled" fullWidth value={selected} onChange={handleChange}>
            <MenuItem key={0} value={0} disabled>Город</MenuItem>
            {
                cities && cities.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))
            }
        </Select>
    );
};

function SelectServiceCategory({selected, setSelected}) {

    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        fetch("https://bot-dev-domain.com:1444/services/categories")
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
        <Select variant="filled" fullWidth value={selected} onChange={handleChange}>
            <MenuItem key={0} value={0} disabled>Категория</MenuItem>
            {
                categories && categories.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))
            }
        </Select>
    );
};

function SelectServices({category, selected, setSelected}) {

    const [services, setServices] = useState([]);
    useEffect(()=>{
        fetch(`https://bot-dev-domain.com:1444/services?category_id=${category}`)
        .then(response => response.json())
        .then(data => {
            setServices(data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [category]);

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <Select variant="filled" fullWidth value={selected} onChange={handleChange} multiple>
            <MenuItem key={0} value={0} disabled>Услуга</MenuItem>
            {
                services && services.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))
            }
        </Select>
    );
};