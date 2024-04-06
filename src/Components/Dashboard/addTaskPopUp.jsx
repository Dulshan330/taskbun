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
import React, { useEffect, useState } from "react";
import { font } from "../../config";
import useAuthentication from "../../Hooks/authUtils";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebase";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const AddTaskPopUp = (props) => {
    const { open, onClose, btnOnclick } = props;
    const { authUser } = useAuthentication();
    const [userId, setUserId] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [date, setDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // check the current user state
        if (authUser) {
        setUserId(authUser);
        }
    });

    const storeTask = async () => {
        if (taskTitle == '' || taskDescription == '' || date == null) {
        setErrorMessage("Please fill out all fields!");
        } else {
        const isCheck = false;
        // Store task in Firestore
        const collectionRef = collection(firestore, "users", userId, "todolist");
        await addDoc(collectionRef, {
            taskTitle,
            taskDescription,
            isCheck,
            date,
        });
        setTaskTitle("");
        setTaskDescription("");
        setDate(null);
        onClose();
        }
    };

    return (
        <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby={"alert-dialog-title"}
        >
        <DialogTitle
            id={"alert-dialog-title"}
            sx={{ fontFamily: font, textTransform: "capitalize"}}
        >
            add your new task
        </DialogTitle>
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
            <Button onClick={storeTask} color="success">
            Add
            </Button>
            <Button onClick={btnOnclick} color="error">
            Cancel
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default AddTaskPopUp;
