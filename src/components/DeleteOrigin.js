import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadOrigins } from "../slices/Origin/originSlice";
import { deleteOrigin } from "../api/usages";
const DeleteOrigin = ({ open, onClose, originId, origin, }) => {
    const dispatch = useDispatch();
    const { pagination } = useSelector((state) => state.origins);
    const handleDelete = async () => {
        try {
            await deleteOrigin(originId);
            dispatch(loadOrigins(pagination));
            onClose();
        }
        catch (error) {
            console.error("Failed to delete origin:", error);
        }
    };
    return (_jsxs(Dialog, { open: open, onClose: onClose, children: [_jsx(DialogTitle, { children: "Confirm Deletion" }), _jsx(DialogContent, { children: _jsxs(Typography, { variant: "body1", children: ["Are you sure you want to delete \"", origin, "\"?"] }) }), _jsxs(DialogActions, { sx: { p: '10px 24px 20px', justifyContent: 'space-between' }, children: [_jsx(Button, { onClick: onClose, color: "primary", variant: "contained", children: "Cancel" }), _jsx(Button, { onClick: handleDelete, color: "error", variant: "contained", children: "Delete" })] })] }));
};
export default DeleteOrigin;
