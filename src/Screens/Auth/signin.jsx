import {
    Box,
    FormControl,
    FormLabel,
    Typography,
    Alert,
} from "@mui/material";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    font,
    gradientColor,
    themeColor1,
    themeColor2,
    themeColor3,
    themeColor4,
} from "../../config";
import logo from "../../Assets/Images/logo.png";
import CustomTextField from "../../Components/TextField/customTextField";
import CustomButton from "../../Components/CustomButton/customButton";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const signin = (e) => {
        e.preventDefault();
        if (email == "" || password == "") {
        setErrorMessage(" Please fill out all fields!");
        } else {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            console.log(userCredential);
            setEmail("");
            setPassword("");
            navigate("/dashboard");
            })
            .catch((error) => {
            console.log(error);
            switch (error.code) {
                case "auth/invalid-email":
                setErrorMessage("The email address is not valid.");
                break;
                case "auth/user-disabled":
                setErrorMessage(
                    "The user account has been disabled by an administrator."
                );
                break;
                case "auth/user-not-found":
                setErrorMessage(
                    "There is no user record corresponding to the provided email."
                );
                break;
                case "auth/wrong-password":
                setErrorMessage("The password is invalid for the given email.");
                break;
                case "auth/invalid-credential":
                setErrorMessage(
                    "The provided credential is invalid or has expired."
                );
                break;
                default:
                setErrorMessage(`Error: ${error.message}`);
                break;
            }
            });
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
                Signin to Your Account
                </FormLabel>
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
                <Link
                to={"/reset"}
                style={{
                    textDecoration: "none",
                }}
                >
                <Typography
                    variant="body1"
                    color={themeColor3}
                    sx={{
                    textAlign: "right",
                    marginRight: "1rem",
                    "&:hover": { color: themeColor3 },
                    color: themeColor4,
                    }}
                >
                    Forgot password?
                </Typography>
                </Link>
                <CustomButton
                text={"Sign in"}
                color={themeColor4}
                bgcolor={themeColor2}
                hovercolor={themeColor4}
                bghovercolor={themeColor3}
                onClick={signin}
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
                New here?
                </Typography>
                <Typography
                variant="body1"
                color={themeColor4}
                textAlign={"center"}
                sx={{ marginY: "1rem" }}
                >
                Sign up and enjoy the features of Taskbun!
                </Typography>
                <Link
                to={"/signup"}
                style={{
                    textDecoration: "none",
                }}
                >
                <CustomButton
                    text={"Sign Up"}
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

export default SignIn;
