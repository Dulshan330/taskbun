import { Box, Button, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import { font, themeColor1, themeColor3, themeColor4 } from "../../config";
import AddIcon from "@mui/icons-material/Add";
import AddTaskPopUp from "./addTaskPopUp";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const DashboardHeader = (props) => {
    const { username } = props;
    const [open, setOpen] = useState(false);

    const style = { width: "300px" };

    const handelClickOpen = () => {
        setOpen(true);
    };
    const handelClose = () => {
        setOpen(false);
    };

    const signOutUser = () => {
        signOut(auth)
        .then(() => {
            console.log("sign out successful");
        })
        .catch((error) => console.log(error));
    };

    return (
        <Box
        sx={{
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: font,
            borderBottom: `solid ${themeColor3} 2px`,
            background: themeColor1,
        }}
        >
        {/* Button */}
        <Box sx={style}>
            <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
                textTransform: "capitalize",
                background: themeColor3,
                color: themeColor4,
                borderRadius: "50px",
                "&:hover": {
                background: themeColor4,
                color: themeColor3,
                },
            }}
            onClick={handelClickOpen}
            >
            Add New
            </Button>
        </Box>
        <AddTaskPopUp
            open={open}
            onClose={handelClose}
            btnOnclick={handelClose}
        />

        {/* Title */}
        <Box sx={style}>
            <Typography variant="h4" color={themeColor4} textAlign={"center"}>
            Dashboard
            </Typography>
        </Box>

        {/* User info */}
        <Box
            sx={{
            width: "300px",
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            }}
        >
            <Typography variant="body1" color={themeColor4} textAlign={"right"}>
            Hi, {username}
            </Typography>
            <IconButton
            onClick={signOutUser}
            sx={{ "&:hover": { background: themeColor3 }, marginLeft: "1rem" }}
            >
            <LogoutIcon color="error" />
            </IconButton>
        </Box>
        </Box>
    );
};

export default DashboardHeader;
