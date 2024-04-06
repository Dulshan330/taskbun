import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // check the current user state
        const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user);
            navigate("/dashboard");
        } else {
            setAuthUser(null);
            navigate("/signin");
        }
        });
        return () => {
        listen();
        };
    });

    return <React.Fragment>{authUser ? <Box></Box> : <Box></Box>}</React.Fragment>;
};

export default AuthDetails;
