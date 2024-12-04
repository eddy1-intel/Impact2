

import React, { useState, useEffect } from "react";
import "./MainContent.css";

const MainContent = ({ filters }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);



    const fetchData = async () => {
        try {
            const response = await fetch("/classification_data.json");
            if (!response.ok) throw new Error("Failed to load JSON data");
    
            const jsonData = await response.json();
    
            const structuredData = jsonData.map((item) => ({
                PROCESS: item.PROCESS || "N/A",
                FACILITY: item.FACILITY || "N/A",
                FIST_P: item.FIST_P || "N/A",
                CEID: item.CEID || "N/A",
                ENTITY_UP_VS_TOTAL: item.ENTITY_UP_VS_TOTAL || "N/A",
                WSE_CS: item.WSE_CS || "N/A",
                WSE_CW: item.WSE_CW || "N/A",
                SPL_INPUT: item.SPL_INPUT ? item.SPL_INPUT.split("Help needed?")[0].trim() : "N/A",
                TARGET_ML: item.TARGET_ML || "N/A",
                LIMITER_SPL: item.LIMITER_SPL || "N/A",
            }));
    
            console.log("Structured Data:", structuredData); // Debug structured data
            setData(structuredData);
            setFilteredData(structuredData);
        } catch (err) {
            console.error("Error loading data:", err);
        }
    };
    

    /*

    const fetchData = async () => {
        const staticData = [
            {
                PROCESS: "1274",
                FACILITY: "F42",
                FIST_P: "BE-LL",
                CEID: "VFNdi",
                ENTITY_UP_VS_TOTAL: "10/12 [8.5]",
                WSE_CS: "7564 [7000]",
                WSE_CW: "5231 [7000]",
                SPL_INPUT: "Tools required to hit REV_CAP: 18",
                TARGET_ML: "Limiter",
                LIMITER_SPL: "Limiter",
            },
            {
                PROCESS: "1273",
                FACILITY: "F28",
                FIST_P: "FIN",
                CEID: "AB123",
                ENTITY_UP_VS_TOTAL: "8/10 [7.2]",
                WSE_CS: "6784 [7000]",
                WSE_CW: "4900 [7000]",
                SPL_INPUT: "Staffing % current shift: 90%",
                TARGET_ML: "Recovery",
                LIMITER_SPL: "Not Limiter",
            },
        ];
        setData(staticData);
        setFilteredData(staticData);
    };

    */


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!filters) {
            setFilteredData(data);
            return;
        }

        let updatedData = [...data];

        if (filters.process.length > 0) {
            updatedData = updatedData.filter((row) =>
                filters.process.includes(row.PROCESS)
            );
        }

        if (filters.fab) {
            updatedData = updatedData.filter((row) => row.FACILITY === filters.fab);
        }

        if (filters.fist.length > 0 && !filters.fist.includes("ALL")) {
            updatedData = updatedData.filter((row) =>
                filters.fist.includes(row.FIST_P)
            );
        }

        if (filters.status.length > 0 && !filters.status.includes("ALL")) {
            updatedData = updatedData.filter((row) =>
                filters.status.includes(row.TARGET_ML)
            );
        }

        setFilteredData(updatedData);
    }, [filters, data]);

    return (
        <div className="main-content">
            <div className="table-wrapper">
                {filteredData.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>PROCESS</th>
                                <th>FIST_P</th>
                                <th>CEID</th>
                                <th>ENTITY_UP_VS_TOTAL</th>
                                <th>WSE_CS</th>
                                <th>WSE_CW</th>
                                <th>SPL_INPUT</th>
                                <th>TARGET_ML</th>
                                <th>LIMITER_SPL</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.PROCESS}</td>
                                    <td>{row.FIST_P}</td>
                                    <td>{row.CEID}</td>
                                    <td>{row.ENTITY_UP_VS_TOTAL}</td>
                                    <td>{row.WSE_CS}</td>
                                    <td>{row.WSE_CW}</td>
                                    <td>{row.SPL_INPUT}</td>
                                    <td>{row.TARGET_ML}</td>
                                    <td>{row.LIMITER_SPL}</td>
                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={() => console.log("Edit row:", row)}
                                        >
                                            ✏️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available. Adjust filters and try again.</p>
                )}
            </div>
        </div>
    );
};

export default MainContent;
