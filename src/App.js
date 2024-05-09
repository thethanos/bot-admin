import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./services/providers/theme";

import Topbar from "./components/global/Topbar";
import MainSidebar from "./components/global/MainSidebar";

import Dashboard from "./pages/dashboard/Dashboard";
import Masters from "./pages/masters/Masters";
import Cities from "./pages/cities/Cities";
import Categories from "./pages/categories/Categories";
import Services from "./pages/services/Services";

function App() {
    const [theme, colorMode] = useMode();
    return ( 
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <MainSidebar />
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
