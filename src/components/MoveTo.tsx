import { Box, IconButton, Pagination, Paper, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrigins, Origins, setPage } from "../slices/Origin/originSlice";
import { AppDispatch, RootState } from "../slices/store";
import { useNavigate } from "react-router-dom";
import AddOrigin from "./AddOrigin";
import DeleteOrigin from "./DeleteOrigin";

const MoveTo = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { origins, pagination, loading } = useSelector(
    (state: RootState) => state.origins,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState<Origins>({
    id: -1,
    origin: "",
  });

  useEffect(() => {
    dispatch(loadOrigins(pagination));
  }, [dispatch, pagination]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page - 1));
  };

  console.log(pagination);

  return (
    <Paper elevation={8} sx={{ margin: "12px", padding: "12px" }}>
      <Box
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography color="text.primary" variant="h6">
          All origins
        </Typography>
        <Box>
          <IconButton
            onClick={() => {
              navigate("/sec");
            }}
          >
            <CloseIcon />
          </IconButton>
          <IconButton onClick={() => setIsModalOpen(true)}>
            <AddBoxIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ marginTop: "16px" }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : origins.length !== 0 ? (
          origins.map(
            (origin: { id: number; origin: string }, index: number) => (
              <Paper
                key={index}
                sx={{
                  padding: "8px",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>{origin.origin}</Typography>
                <IconButton
                  onClick={() => {
                    setSelectedOrigin(origin);
                    setIsModalDeleteOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            ),
          )
        ) : (
          <Typography color="text.secondary">
            No origins, press "+" to add
          </Typography>
        )}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <Pagination
          count={pagination.totalPages}
          page={pagination.page + 1}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      {isModalOpen && (
        <AddOrigin open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {isModalDeleteOpen && (
        <DeleteOrigin
          open={isModalDeleteOpen}
          onClose={() => setIsModalDeleteOpen(false)}
          origin={selectedOrigin.origin}
          originId={selectedOrigin.id}
        />
      )}
    </Paper>
  );
};

export default MoveTo;
