import React from "react";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material";
import { themeColor4 } from "../../config";

const options = {
  shouldForwardProp: (prop) => prop !== "borderColor",
};

const outlinedSelectors = [
  "& .MuiOutlinedInput-notchedOutline",
  "&:hover .MuiOutlinedInput-notchedOutline",
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline",
];

const TextField = styled(
  MuiTextField,
  options
)(({ borderColor, inputTextColor }) => ({
  "& label.Mui-focused": {
    color: borderColor,
  },
  [outlinedSelectors.join(",")]: {
    borderWidth: 1,
    borderColor,
    "&:hover": {
      borderColor: themeColor4,
    },
  },
  "& .MuiInputBase-input": {
    color: inputTextColor,
  },
}));

const CustomTextField = (props) => {
  const { borderColor, label, onChange, value, type } = props;
  return (
    <TextField
      id="outlined-basic"
      label={label}
      borderColor={borderColor}
      value={value}
      onChange={onChange}
      type={type}
      inputTextColor={themeColor4}
      sx={{
        margin: "1rem",
        "& label": {
          color: themeColor4,
        },
      }}
      required
    />
  );
};

export default CustomTextField;
