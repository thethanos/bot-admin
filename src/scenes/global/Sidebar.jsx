import React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { getColors } from "../../theme";
import userImage from "../../assets/user.jpeg";

import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';

const MainItems = [
    {
        title: "Статистика",
        to: "/",
        icon: TimelineOutlinedIcon
    },
    {
        title: "Мастер",
        to: "/masters",
        icon: PeopleOutlinedIcon
    },
    {
        title: "Город",
        to: "/cities",
        icon: LocationCityOutlinedIcon
    },
    {
        title: "Категория",
        to: "/categories",
        icon: ClassOutlinedIcon
    },
    {
        title: "Услуга",
        to: "/services",
        icon: ContentCutOutlinedIcon
    }
];

function Item({title, to, icon, selected, setSelected}) {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{color: colors.grey[100]}}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    );
}

function Sidebar() {
    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const style = {
        "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
            color: "#868dfb !important", 
        },
        "& .pro-menu-item.active": {
            color: "#6870fa !important",
        }
    };

    const [isCollapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return(
        <Box sx={style}>
            <ProSidebar collapsed={isCollapsed} style={{listStyle: "none"}}>
                <Menu>
                    <MenuItem 
                        onClick={()=> setCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINS
                                </Typography>
                                <IconButton onClick={() => setCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-pic"
                                    width="100px"
                                    height="100px"
                                    src={userImage}
                                    style={{cursor: "pointer", borderRadius: "50%"}}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">Text</Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>Admin</Typography>
                            </Box>
                        </Box>
                    )}
                    <Box paddingLeft={isCollapsed?undefined:"10%"}>
                        {
                            MainItems && MainItems.map((item) => (
                                <Item
                                    key={item.title} 
                                    title={item.title}
                                    to={item.to}
                                    icon={<item.icon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            ))
                        }
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;