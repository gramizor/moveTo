import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadOrigins } from "../slices/Origin/originSlice";
import { AppDispatch, RootState } from "../slices/store";
import { deleteOrigin } from "../api/usages";

type DeleteOriginProps = {
  open: boolean;
  onClose: () => void;
  originId: number;
  origin: string;
};

const DeleteOrigin: React.FC<DeleteOriginProps> = ({
  open,
  onClose,
  originId,
  origin,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { pagination } = useSelector((state: RootState) => state.origins);

  const handleDelete = async () => {
    try {
      await deleteOrigin(originId);
      dispatch(loadOrigins(pagination));
      onClose();
    } catch (error) {
      console.error("Failed to delete origin:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete "{origin}"?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: '10px 24px 20px', justifyContent: 'space-between' }}>
          <Button onClick={onClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
    </Dialog>
  );
};

export default DeleteOrigin;
