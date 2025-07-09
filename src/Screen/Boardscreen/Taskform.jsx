import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SendIcon from '@mui/icons-material/Send';
import BackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from "react-router-dom";

const Taskform = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      id: Date.now().toString(),
      title,
      description,
      assignee,
      dueDate,
    };

    if (onSubmit) onSubmit(task);
    setTitle("");
    setDescription("");
    setAssignee("");
    setDueDate("");
  };

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 700, mx: "auto", mt: 5, borderRadius: 4  }} >
        <IconButton onClick={()=>navigate('/boards')} size='small' sx={{mr:80}}><BackIcon/></IconButton>
      <Typography  variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AssignmentIcon color="primary" sx={{ mr: 1 }} />
        Create New Task
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
         
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Title"
              variant="outlined"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Box sx={{ display: "flex", alignItems: "center", pr: 1 }}>
                    <AssignmentIcon sx={{ color: "primary.main" }} />
                  </Box>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Task Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Assign To</InputLabel>
              <Select
                value={assignee}
                label="Assign To"
                onChange={(e) => setAssignee(e.target.value)}
              >
                <MenuItem value="john@example.com">John</MenuItem>
                <MenuItem value="jane@example.com">Jane</MenuItem>
                <MenuItem value="dev@example.com">Developer</MenuItem>
                <MenuItem value="admin@example.com">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              InputLabelProps={{ shrink: true }}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                    <CalendarMonthIcon sx={{ color: "primary.main" }} />
                  </Box>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} textAlign="right">
            <Tooltip title="Create Task">
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ px: 4, py: 1.5, fontWeight: "bold", fontSize: "1rem" }}
              >
                Create
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Taskform;
