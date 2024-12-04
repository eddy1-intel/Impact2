import React, { useState } from "react";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "./App.css";

function App() {
    const navItems = [
        "Process-Time",
        "EFL",
        "Run-Rate",
        "Huddle",
        "Community-Reports",
        "Capacity-Tracking",
        "OEE",
    ];

    const [filters, setFilters] = useState({
        process: [],
        fab: "",
        fist: [],
        area: "",
        status: [],
    });

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="app-container">
            <TopNav items={navItems} />
            <div className="content-container">
                <Sidebar onApplyFilters={handleApplyFilters} />
                <MainContent filters={filters} />
            </div>
        </div>
    );
}

export default App;
