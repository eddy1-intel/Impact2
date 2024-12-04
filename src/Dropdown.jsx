import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ label, options, isMultiSelect = true, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(isMultiSelect ? [] : null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        if (isMultiSelect) {
            const updatedSelection = selected.includes(option)
                ? selected.filter((item) => item !== option)
                : [...selected, option];
            setSelected(updatedSelection);
            onSelect(updatedSelection);
        } else {
            setSelected(option);
            onSelect(option);
            setIsOpen(false); // Close dropdown after selection
        }
    };

    return (
        <div className="dropdown">
            <label>{label}</label>
            <button className="dropdown-button" onClick={toggleDropdown}>
                {isMultiSelect
                    ? selected.length > 0
                        ? selected.join(", ")
                        : `Select ${label}`
                    : selected || `Select ${label}`}
                <span className="dropdown-arrow">▼</span>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="dropdown-option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {isMultiSelect && (
                                <input
                                    type="checkbox"
                                    checked={selected.includes(option)}
                                    readOnly
                                />
                            )}
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
