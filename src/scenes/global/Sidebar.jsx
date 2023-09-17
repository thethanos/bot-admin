import React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { getColors } from "../../theme";
import userImage from "../../assets/user.jpeg";

import HomeOutlinedIcon from "@mui/icons-material/HomeMaxOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcond from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';


const DashboardItem =     {
    title: "Dashboard",
    to: "/",
    icon: HomeOutlinedIcon,
};

const MainItems = [
    {
        title: "Статистика",
        to: "/statistics",
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

const DataItems = [
    {
        title: "Manage team",
        to: "/team",
        icon: PeopleOutlinedIcon
    },
    {
        title: "Contacts information",
        to: "/contacts",
        icon: ContactsOutlinedIcond
    },
    {
        title: "Invoice Balances",
        to: "/invoices",
        icon: ReceiptOutlinedIcon
    }
];

const PagesItems = [
    {
        title: "Profile form",
        to: "/form",
        icon: PersonOutlinedIcon
    },
    {
        title: "Calendar",
        to: "/calendar",
        icon: CalendarTodayOutlinedIcon
    },
    {
        title: "FAQ Page",
        to: "/faq",
        icon: HelpOutlinedIcon
    }
];

const ChartsItems = [
    {
        title: "Bar Chart",
        to: "/bar",
        icon: BarChartOutlinedIcon
    },
    {
        title: "Pie Chart",
        to: "/pie",
        icon: PieChartOutlinedIcon
    },
    {
        title: "Line Chart",
        to: "/line",
        icon: TimelineOutlinedIcon
    },
    {
        title: "Geography Chart",
        to: "/geography",
        icon: MapOutlinedIcon
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
    const [isCollapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return(
        <Box sx={{
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
        }}>
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
                        {/*
                        <Item
                            key={DashboardItem.title}
                            title={DashboardItem.title}
                            to={DashboardItem.to}
                            icon={<DashboardItem.icon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m: "15px 0 5px 20px"}}
                        >Data</Typography>
                        {
                            DataItems && DataItems.map((item) => (
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
                                                <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m: "15px 0 5px 20px"}}
                        >Pages</Typography>
                        {
                            PagesItems && PagesItems.map((item) => (
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
                                                <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m: "15px 0 5px 20px"}}
                        >Charts</Typography>
                        {
                            ChartsItems && ChartsItems.map((item) => (
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
                    */}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;