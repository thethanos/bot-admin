import React, { useEffect, useState } from "react";
import {
    Box,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";

function ServiceCategorySelect({ selected, setSelected }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
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
                onChange={handleChange}
            >
                <MenuItem key={0} value={0} disabled>Категория</MenuItem>
                {
                    categories && categories.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))
                }
            </Select>
            <FormHelperText sx={{ml: "15px", color: "red"}}>{selected.help}</FormHelperText>
        </Box>
    );
};

export default ServiceCategorySelect;