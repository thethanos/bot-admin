import { useState } from "react";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./services/providers/theme";

import Topbar from "./components/global/Topbar";
import MainSidebar from "./components/global/MainSidebar";

import Dashboard from "./pages/dashboard/Dashboard";
import Masters from "./pages/masters/Masters";
import Cities from "./pages/cities/Cities";
import Categories from "./pages/categories/Categories";
import Services from "./pages/services/Services";

function calcWidth(isCollapsed) {
    if (isCollapsed) {
        return "calc(100vw - 80px)";
    }

    return "calc(100vw - 270px)";
}

function App() {
    const [theme, colorMode] = useMode();
    const [isCollapsed, setCollapsed] = useState(false);
    return ( 
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <MainSidebar isCollapsed={isCollapsed} setCollapsed={setCollapsed} />
                    <Box className="content" width={calcWidth(isCollapsed)} sx={{transition: "width 0.5s ease-in-out"}}>
                        <Topbar />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/masters" element={<Masters />} />
                            <Route path="/cities" element={<Cities />} />
                            <Route path="/categories" element={<Categories/>} />
                            <Route path="/services" element={<Services />} />
                        </Routes>
                    </Box>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
