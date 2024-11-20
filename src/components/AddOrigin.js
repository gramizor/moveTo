import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, } from "@mui/material";
import { createOrigin } from "../api/usages";
import { useDispatch, useSelector } from "react-redux";
import { loadOrigins } from "../slices/Origin/originSlice";
import { extractValidOrigins } from "../helpers/helper";
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
const AddOrigin = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const debouncedValue = useDebounce(inputValue, 400);
    const [elements, setElements] = useState([]);
    const { pagination } = useSelector((state) => state.origins);
    useEffect(() => {
        const validOrigins = extractValidOrigins(debouncedValue);
        setElements(validOrigins);
    }, [debouncedValue]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validOrigins = extractValidOrigins(debouncedValue);
        setElements(validOrigins);
        if (validOrigins.length > 0) {
            try {
                await createOrigin(validOrigins);
                dispatch(loadOrigins(pagination));
                setInputValue("");
                onClose();
            }
            catch (error) {
                console.error("Failed to create origin:", error);
            }
        }
    };
    return (_jsxs(Dialog, { open: open, onClose: onClose, fullWidth: true, maxWidth: "sm", children: [_jsx(DialogTitle, { children: "Add Origin" }), _jsxs(DialogContent, { children: [_jsx("form", { onSubmit: handleSubmit, children: _jsx(TextField, { fullWidth: true, multiline: true, label: "Enter origin", value: inputValue, onChange: (e) => setInputValue(e.target.value), margin: "normal" }) }), _jsxs(Box, { mt: 2, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "List of origins:" }), elements.length > 0 ? (elements.map((el, index) => (_jsxs(React.Fragment, { children: [_jsx("a", { href: el, target: "_blank", rel: "noopener noreferrer", children: el }), index !== elements.length - 1 && ", "] }, index)))) : (_jsx(Typography, { children: "No valid origins found" }))] })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: onClose, color: "error", variant: "contained", children: "Close" }), _jsx(Button, { onClick: handleSubmit, color: "primary", type: "submit", variant: "contained", disabled: !elements.length, children: "Add" })] })] }));
};
export default AddOrigin;
