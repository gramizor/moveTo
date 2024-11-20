import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { createOrigin } from "../api/usages";
import { useDispatch, useSelector } from "react-redux";
import { loadOrigins } from "../slices/Origin/originSlice";
import { AppDispatch, RootState } from "../slices/store";
import { extractValidOrigins } from "../helpers/helper";

type AddOriginProps = {
  open: boolean;
  onClose: () => void;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

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
const AddOrigin: React.FC<AddOriginProps> = ({ open, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 400);

  const [elements, setElements] = useState<string[]>([]);
  const { pagination } = useSelector((state: RootState) => state.origins);

  useEffect(() => {
    const validOrigins = extractValidOrigins(debouncedValue);
    setElements(validOrigins);
  }, [debouncedValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validOrigins = extractValidOrigins(debouncedValue);
    setElements(validOrigins);

    if (validOrigins.length > 0) {
      try {
        await createOrigin(validOrigins);
        dispatch(loadOrigins(pagination));
        setInputValue("");
        onClose();
      } catch (error) {
        console.error("Failed to create origin:", error);
      }
    }
  };

  return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Origin</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                multiline
                label="Enter origin"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                margin="normal"
            />
          </form>
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              List of origins:
            </Typography>
            {elements.length > 0 ? (
                elements.map((el, index) => (
                    <React.Fragment key={index}>
                      <a href={el} target="_blank" rel="noopener noreferrer">
                        {el}
                      </a>
                      {index !== elements.length - 1 && ", "}
                    </React.Fragment>
                ))
            ) : (
                <Typography>No valid origins found</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error" variant="contained">
            Close
          </Button>
          <Button
              onClick={handleSubmit}
              color="primary"
              type="submit"
              variant="contained"
              disabled={!elements.length}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default AddOrigin;
