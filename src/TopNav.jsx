import React, { useState } from "react";
import "./TopNav.css";

const TopNav = ({ items, onItemClick, onDropdownSelect }) => {
    const [dropdownVisible, setDropdownVisible] = useState(null);

    const handleItemClick = (item) => {
        if (item === "Process-Time" || item === "EFL") {
            setDropdownVisible((prev) => (prev === item ? null : item));
        } else {
            setDropdownVisible(null);
            onItemClick(item);
        }
    };

    const handleDropdownOptionClick = (parent, option) => {
        onDropdownSelect(parent, option);
        setDropdownVisible(null);
    };

    return (
        <nav className="top-nav">
            <ul>
                {items.map((item, index) => (
                    <li key={index} className="top-nav-item">
                        <button onClick={() => handleItemClick(item)}>{item}</button>
                        {(item === "Process-Time" || item === "EFL") && dropdownVisible === item && (
                            <div className="dropdown-menu">
                                {["Summary", "Drildown"].map((option, idx) => (
                                    <div
                                        key={idx}
                                        className="dropdown-option"
                                        onClick={() => handleDropdownOptionClick(item, option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TopNav;
