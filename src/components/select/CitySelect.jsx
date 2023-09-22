import React, { useEffect, useState } from "react";
import {
    Box,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";

function CitySelect({ selected, setSelected }) {
    const [cities, setCities] = useState([]);

    useEffect(() => {
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
        setSelected({ value: event.target.value });
    };

    return (
        <Box>
            <Select
                fullWidth 
                variant="filled"
                value={selected.value}
                error={selected.error}
                sx={{color: selected.error?"red":""}}  
                onChange={handleChange}>
                <MenuItem key={0} value={0} disabled>Город</MenuItem>
                {
                    cities && cities.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))
                }
            </Select>
            <FormHelperText sx={{ ml: "15px", color: "red" }}>{selected.help}</FormHelperText>
        </Box>
    );
};

export default CitySelect;