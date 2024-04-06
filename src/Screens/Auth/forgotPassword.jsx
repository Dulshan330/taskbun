import {
    Alert,
    Box,
    FormControl,
    FormLabel,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
    font,
    themeColor1,
    themeColor2,
    themeColor3,
    themeColor4,
} from "../../config";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import logo from "../../Assets/Images/logo.png";
import CustomTextField from "../../Components/TextField/customTextField";
import CustomButton from "../../Components/CustomButton/customButton";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [resetSent, setResetSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        if (email == "") {
        setErrorMessage("Please fill out the field!");
        } else {
        try {
            await sendPasswordResetEmail(auth, email);
            setResetSent(true);
        } catch (error) {
            console.error(error.message);
            switch (error.code) {
            case "auth/invalid-email":
                setErrorMessage("The email address is not valid.");
                break;
            default:
                setErrorMessage(`Error: ${error.message}`);
                break;
            }
        }
        }
    };

    return (
        <Box
        sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: themeColor1,
        }}
        >
        {resetSent ? (
            <Box>
            <Alert severity="success">
                Password reset email sent. Check your email.
            </Alert>
            <Link
                to={"/signin"}
                style={{
                textDecoration: "none",
                }}
            >
                <Typography
                variant="body1"
                color={themeColor3}
                sx={{
                    textAlign: "center",
                    margin: "1rem",
                    "&:hover": { color: themeColor3 },
                    color: themeColor4,
                }}
                >
                Back To Signin
                </Typography>
            </Link>
            </Box>
        ) : (
            <Box sx={{ border: `solid 1px ${themeColor4}`, padding: "2rem" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={logo} alt="logo" height={"50px"} />
                <Typography variant="h4" color={themeColor4}>
                Taskbun
                </Typography>
            </Box>
            <Box
                sx={{
                display: "flex",
                padding: "2rem 4rem",
                }}
            >
                <FormControl>
                <FormLabel
                    sx={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: 600,
                    fontFamily: font,
                    textTransform: "capitalize",
                    color: themeColor4,
                    }}
                >
                    to reset the password
                </FormLabel>
                <CustomTextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    borderColor={themeColor4}
                />
                <CustomButton
                    text={"Reset Password"}
                    color={themeColor4}
                    bgcolor={themeColor2}
                    hovercolor={themeColor4}
                    bghovercolor={themeColor3}
                    onClick={handleReset}
                />

                <Link
                    to={"/signin"}
                    style={{
                    textDecoration: "none",
                    }}
                >
                    <Typography
                    variant="body1"
                    color={themeColor3}
                    sx={{
                        textAlign: "center",
                        margin: "1rem",
                        color: themeColor4,
                        "&:hover": { color: themeColor3 },
                    }}
                    >
                    Back To Signin
                    </Typography>
                </Link>
                {errorMessage && (
                    <Box>
                    <Alert severity="error">{errorMessage}</Alert>
                    </Box>
                )}
                </FormControl>
            </Box>
            </Box>
        )}
        </Box>
    );
};

export default ForgotPassword;
