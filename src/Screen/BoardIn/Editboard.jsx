import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Stack
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
const AddTaskDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Icon Button to Open Dialog */}
      <IconButton onClick={() => setOpen(true)}>
       <EditIcon/>
      </IconButton>

      {/* Dialog Box */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth >
        <DialogTitle
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    pr: 1  // Add right padding for spacing
  }}
>
  <span>Edit Task</span>
  <IconButton onClick={() => setOpen(false)} size="small">
    <CloseIcon sx={{ fontSize: 20 }} />
  </IconButton>
</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
         <TextField label="Task Title" variant="outlined" fullWidth />
          <TextField label="Description" multiline rows={3} fullWidth />
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <input type="file" />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTaskDialog;
