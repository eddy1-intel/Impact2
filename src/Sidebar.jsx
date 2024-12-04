import React, { useState } from "react";
import Dropdown from "./Dropdown";
import "./Sidebar.css";

const Sidebar = ({ onApplyFilters }) => {
    const [selection, setSelection] = useState("Fist");
    const [filters, setFilters] = useState({
        process: [], // Maps to PROCESS in the JSON
        fab: "", // Maps to FACILITY in the JSON
        fist: [], // Maps to FIST_P in the JSON
        status: [], // Maps to TARGET_ML in the JSON
    });

    const handleRadioChange = (e) => {
        const value = e.target.value;
        setSelection(value);

        if (value === "Area") {
            alert("Coming soon");
        }

        setFilters((prev) => ({
            ...prev,
            fist: value === "Fist" ? prev.fist : [],
        }));
    };

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        onApplyFilters(filters);
    };

    return (
        <div className="sidebar">
            <h2>Filters</h2>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        name="filterType"
                        value="Fist"
                        checked={selection === "Fist"}
                        onChange={handleRadioChange}
                    />
                    Fist
                </label>
                <label>
                    <input
                        type="radio"
                        name="filterType"
                        value="Area"
                        checked={selection === "Area"}
                        onChange={handleRadioChange}
                    />
                    Area
                </label>
            </div>
            {selection === "Fist" && (
                <>
                    <Dropdown
                        label="Process"
                        options={["1272", "1273", "1274", "1275"]}
                        isMultiSelect={true}
                        onSelect={(selected) => updateFilter("process", selected)}
                    />
                    <Dropdown
                        label="Fab"
                        options={["F28", "F42"]}
                        isMultiSelect={false}
                        onSelect={(selected) => updateFilter("fab", selected)}
                    />
                    <Dropdown
                        label="Fist"
                        options={[
                            "ALL",
                            "BE-LL",
                            "BE-UL",
                            "CON",
                            "FIN",
                            "GATE",
                            "PCT",
                            "PLY-ESD",
                            "SSAFI",
                        ]}
                        isMultiSelect={true}
                        onSelect={(selected) => updateFilter("fist", selected)}
                    />
                    <Dropdown
                        label="Status"
                        options={["ALL", "Limiter", "Not Limiter", "Recovery", "Watch"]}
                        isMultiSelect={true}
                        onSelect={(selected) => updateFilter("status", selected)}
                    />
                </>
            )}
            <button className="apply-filters-button" onClick={applyFilters}>
                Apply Filters
            </button>
        </div>
    );
};

export default Sidebar;
