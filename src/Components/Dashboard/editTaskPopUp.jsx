import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    FormControl,
    TextField,
    Alert,
} from "@mui/material";
import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import useAuthentication from "../../Hooks/authUtils";

const EditTaskPopUp = (props) => {
    const {
        open,
        onClose,
        displayTaskTitle,
        displayTaskDescription,
        displayDate,
        taskId,
    } = props;
    const { authUser } = useAuthentication();
    const [taskTitle, setTaskTitle] = useState(displayTaskTitle);
    const [taskDescription, setTaskDescription] = useState(displayTaskDescription);
    const [date, setDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const updateTask = async () => {
        if (taskTitle == "" || taskDescription == "" || date == null) {
        setErrorMessage("Please fill out all fields!");
        } else {
        const docRef = doc(firestore, "users", authUser, "todolist", taskId);

        try {
            await updateDoc(docRef, {
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            date: date,
            });
            onClose();
        } catch (error) {
            console.error("Error updating document: ", error);
            setErrorMessage("Failed to update task.");
        }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby={"edit-task-dialog"}>
        <DialogTitle id={"edit-task-dialog"}>Edit Task</DialogTitle>
        <DialogContent>
            <DialogContentText></DialogContentText>
            <FormControl sx={{ margin: ".5rem" }}>
            <TextField
                id=""
                label="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                sx={{ marginY: "0.5rem" }}
                color="success"
                required
            />
            <TextField
                id=""
                label="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                sx={{ marginY: "0.5rem" }}
                color="success"
                required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newDate) => {
                    const myDate = new Date(newDate);
                    const day = myDate.getDate();
                    const month = myDate.getMonth() + 1;
                    const year = myDate.getFullYear();
                    setDate(`${year}-${month}-${day}`);
                    }}
                    required
                />
                </DemoContainer>
            </LocalizationProvider>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={updateTask} color="primary">
            Edit
            </Button>
            <Button onClick={onClose} color="primary">
            Cancel
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default EditTaskPopUp;
