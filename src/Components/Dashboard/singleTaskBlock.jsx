import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import {
    themeColor1,
    themeColor2,
    themeColor3,
    themeColor4,
} from "../../config";
import useAuthentication from "../../Hooks/authUtils";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditTaskPopUp from "./editTaskPopUp";

const SingleTaskBlock = (props) => {
    const { taskTitle, taskDescription, id, checkState, date } = props;
    const { authUser } = useAuthentication();
    const [isCheck, setIsCheck] = useState(false);
    const [open, setOpen] = useState(false);

    const handelClickOpen = () => {
        setOpen(true);
    };
    const handelClose = () => {
        setOpen(false);
    };

    const handleCheckboxChange = async () => {
        setIsCheck((prevIsCheck) => !prevIsCheck);
        const docRef = doc(firestore, "users", authUser, "todolist", id);
        try {
        await updateDoc(docRef, {
            isCheck: !isCheck,
        });
        } catch (error) {
        console.error("Error updating document: ", error);
        }
    };

    const deleteTask = async () => {
        await deleteDoc(doc(firestore, "users", authUser, "todolist", id));
    };

    return (
        <Box
        sx={{
            width: "350px",
            margin: "0.5rem",
            background: checkState ? themeColor3 : themeColor2,
            padding: "1rem",
            borderRadius: "0.5rem",
        }}
        >
        <Box
            sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            }}
        >
            <Typography
            variant="body1"
            color={themeColor4}
            sx={{ textDecorationLine: checkState ? "line-through" : "none" }}
            >
            {taskTitle}
            </Typography>
            <Box>
            <Checkbox
                sx={{ color: themeColor4 }}
                color="default"
                onChange={handleCheckboxChange}
                checked={checkState}
            />
            <IconButton
                onClick={handelClickOpen}
                sx={{
                "&:hover": { background: checkState ? themeColor1 : themeColor3 },
                }}
            >
                <EditIcon sx={{ color: themeColor4 }} />
            </IconButton>
            <IconButton
                onClick={deleteTask}
                sx={{
                "&:hover": { background: checkState ? themeColor1 : themeColor3 },
                }}
            >
                <DeleteIcon color="error" />
            </IconButton>
            </Box>
        </Box>

        <hr color={checkState ? themeColor4 : themeColor3} />
        <Typography
            variant="body1"
            color={themeColor4}
            sx={{ textDecorationLine: checkState ? "line-through" : "none" }}
        >
            {taskDescription}
        </Typography>
        <Typography
            variant="body2"
            color={themeColor4}
            sx={{ textDecorationLine: checkState ? "line-through" : "none" }}
        >
            {date}
        </Typography>
        <EditTaskPopUp
            open={open}
            onClose={handelClose}
            displayTaskTitle={taskTitle}
            displayTaskDescription={taskDescription}
            displayDate={date}
            taskId={id}
        />
        </Box>
    );
};

export default SingleTaskBlock;
