import {
    Box,
    FormControl,
    FormLabel,
    Typography,
    Alert,
} from "@mui/material";
import React, { useState } from "react";
import { auth, firestore } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
    font,
    gradientColor,
    themeColor1,
    themeColor2,
    themeColor3,
    themeColor4,
} from "../../config";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/logo.png";
import CustomTextField from "../../Components/TextField/customTextField";
import CustomButton from "../../Components/CustomButton/customButton";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault();
        if (name == "" || email == "" || password == "" || confirmPassword == "") {
        setErrorMessage("Please fill out all fields!");
        } else {
        if (password === confirmPassword) {
            try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Store user information in Firestore
            const docRef = doc(firestore, "users", userCredential.user.uid);
            await setDoc(docRef, {
                uid: userCredential.user.uid,
                name,
                email,
            });
            setEmail("");
            setPassword("");
            navigate("/dashboard");
            } catch (error) {
            console.log(error);
            switch (error.code) {
                case "auth/email-already-in-use":
                setErrorMessage(
                    "The provided email is already in use by an existing user."
                );
                break;
                case "auth/invalid-email":
                setErrorMessage("The email address is not valid.");
                break;
                case "auth/weak-password":
                setErrorMessage(
                    "The password is too weak. It must be at least 6 characters long."
                );
                break;
                default:
                setErrorMessage(`Error: ${error.message}`);
                break;
            }
            }
        } else {
            setErrorMessage(
            "Password and Confirm Password do not match. Please ensure both fields contain the same information."
            );
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
            paddingY: "3rem",
            background: themeColor1,
        }}
        >
        <Box
            sx={{
            border: `solid 1px ${themeColor4}`,
            display: "flex",
            width: "800px",
            }}
        >
            <Box sx={{ flex: 3, padding: "2rem" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={logo} alt="logo" height={"50px"} />
                <Typography variant="h4" color={themeColor4}>
                Taskbun
                </Typography>
            </Box>
            <FormControl sx={{ width: "100%", marginY: "3rem" }}>
                <FormLabel
                sx={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: 600,
                    fontFamily: font,
                    color: themeColor4,
                }}
                >
                Sign Up
                </FormLabel>
                <CustomTextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                borderColor={themeColor4}
                />
                <CustomTextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderColor={themeColor4}
                />
                <CustomTextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderColor={themeColor4}
                />
                <CustomTextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                borderColor={themeColor4}
                />
                <CustomButton
                text={"Sign Up"}
                color={themeColor4}
                bgcolor={themeColor2}
                hovercolor={themeColor4}
                bghovercolor={themeColor3}
                onClick={signup}
                />
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </FormControl>
            </Box>
            <Box
            sx={{
                flex: 2,
                background: `linear-gradient(${gradientColor})`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            <Box>
                <Typography
                variant="h4"
                color={themeColor4}
                textAlign={"center"}
                sx={{ marginY: "1rem" }}
                >
                Already have an account?
                </Typography>
                <Typography
                variant="body1"
                color={themeColor4}
                textAlign={"center"}
                sx={{ marginY: "1rem" }}
                >
                Sign in and continue using Taskbun!
                </Typography>
                <Link
                to={"/signin"}
                style={{
                    textDecoration: "none",
                }}
                >
                <CustomButton
                    text={"Sign in"}
                    color={themeColor1}
                    bgcolor={themeColor4}
                    hovercolor={themeColor4}
                    bghovercolor={themeColor3}
                />
                </Link>
            </Box>
            </Box>
        </Box>
        </Box>
    );
};

export default SignUp;
