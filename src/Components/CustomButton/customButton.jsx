import { Button } from "@mui/material";
import React from "react";

const CustomButton = (props) => {
    const { text, color, bgcolor, hovercolor, bghovercolor, onClick, startIcon } = props;

    return (
        <Button
        variant="contained"
        onClick={onClick}
        startIcon={startIcon}
        sx={{
            width: "fit-content",
            display: "block",
            marginY: "1rem",
            marginX: "auto",
            paddingY: ".5rem",
            paddingX: "3rem",
            borderRadius: "50px",
            textTransform: "capitalize",
            fontSize: "18px",
            background: bgcolor,
            color: color,
            "&:hover": {
            background: bghovercolor,
            color: hovercolor,
            },
        }}
        >
        {text}
        </Button>
    );
};

export default CustomButton;
