import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, IconButton, Pagination, Paper, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrigins, setPage } from "../slices/Origin/originSlice";
import { useNavigate } from "react-router-dom";
import AddOrigin from "./AddOrigin";
import DeleteOrigin from "./DeleteOrigin";
const MoveTo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { origins, pagination, loading } = useSelector((state) => state.origins);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedOrigin, setSelectedOrigin] = useState({
        id: -1,
        origin: "",
    });
    useEffect(() => {
        dispatch(loadOrigins(pagination));
    }, [dispatch, pagination]);
    const handlePageChange = (_, page) => {
        dispatch(setPage(page - 1));
    };
    console.log(pagination);
    return (_jsxs(Paper, { elevation: 8, sx: { margin: "12px", padding: "12px" }, children: [_jsxs(Box, { sx: {
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "flex",
                }, children: [_jsx(Typography, { color: "text.primary", variant: "h6", children: "All origins" }), _jsxs(Box, { children: [_jsx(IconButton, { onClick: () => {
                                    navigate("/sec");
                                }, children: _jsx(CloseIcon, {}) }), _jsx(IconButton, { onClick: () => setIsModalOpen(true), children: _jsx(AddBoxIcon, {}) })] })] }), _jsx(Box, { sx: { marginTop: "16px" }, children: loading ? (_jsx(Typography, { children: "Loading..." })) : origins.length !== 0 ? (origins.map((origin, index) => (_jsxs(Paper, { sx: {
                        padding: "8px",
                        marginBottom: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                    }, children: [_jsx(Typography, { children: origin.origin }), _jsx(IconButton, { onClick: () => {
                                setSelectedOrigin(origin);
                                setIsModalDeleteOpen(true);
                            }, children: _jsx(DeleteIcon, {}) })] }, index)))) : (_jsx(Typography, { color: "text.secondary", children: "No origins, press \"+\" to add" })) }), _jsx(Box, { sx: { display: "flex", justifyContent: "center", marginTop: "16px" }, children: _jsx(Pagination, { count: pagination.totalPages, page: pagination.page + 1, onChange: handlePageChange, color: "primary" }) }), isModalOpen && (_jsx(AddOrigin, { open: isModalOpen, onClose: () => setIsModalOpen(false) })), isModalDeleteOpen && (_jsx(DeleteOrigin, { open: isModalDeleteOpen, onClose: () => setIsModalDeleteOpen(false), origin: selectedOrigin.origin, originId: selectedOrigin.id }))] }));
};
export default MoveTo;
