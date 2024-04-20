import React, { useEffect, useState } from "react";
import {
    Box,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";

function ServicesSelect({ category, selected, setSelected }) {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch(`https://bot-dev-domain.com:1444/services?category_id=${category}`)
            .then(response => response.json())
            .then(data => {
                setSelected({values: ["0"]});
                setServices(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [category]);

    const handleChange = (event) => {
        let items = event.target.value;
        if (items.length === 0) {
            setSelected({values: ["0"]});
        } else {
            setSelected({ values: event.target.value.filter((item)=>{return item !== "0"; }) });
        }
    };

    return (
        <Box>
            <Select
                fullWidth 
                variant="filled"
                value={selected.values}
                error={selected.error} 
                sx={{color: selected.error?"red":""}} 
                onChange={handleChange} 
                multiple
            >
                <MenuItem key={0} value={0} disabled>Услуга</MenuItem>
                {
                    services && services.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))
                }
            </Select>
            <FormHelperText sx={{ ml: "15px", color: "red" }}>{selected.help}</FormHelperText>
        </Box>
    );
};

export default ServicesSelect;