import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

import Dashboard from "./scenes/dashboard/Dashboard";
import Masters from "./scenes/masters/Masters";
import Cities from "./scenes/cities/Cities";
import Categories from "./scenes/categories/Categories";
import Services from "./scenes/services/Services";

function App() {
    const [theme, colorMode] = useMode();
    return ( 
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar />
                    <main className="content">
                        <Topbar />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/masters" element={<Masters />} />
                            <Route path="/cities" element={<Cities />} />
                            <Route path="/categories" element={<Categories/>} />
                            <Route path="/services" element={<Services />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
