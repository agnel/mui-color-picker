import React from "react";
import Box from "@mui/material/Box";
import { Done as TickIcon } from "@mui/icons-material";
import { MouseEventHandler } from "react";

export interface ColorOptionProps {
  color: string;
  selected?: Boolean;
  onClick?: (event: React.MouseEvent, color: string) => void;
}

export const ColorOption = (props: ColorOptionProps) => {
  const onClick: MouseEventHandler = (event) => {
    if (props.onClick) {
      props.onClick(event, props.color);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        outline: "none",
        cursor: "pointer",
        position: "relative",
        width: "18px",
        height: "18px",
        margin: "3px",
        boxSizing: "border-box",
        borderRadius: "50%",
        backgroundColor: props.color,
        "&:hover": {
          width: "20px",
          height: "20px",
          margin: "2px",
          boxShadow:
            "0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%), 0px 1px 3px 0px rgb(0 0 0 / 20%)"
        }
      }}
      onClick={onClick}
    >
      {props.selected && (
        <Box>
          <TickIcon
            sx={{
              color: "#fff",
              transition: "opacity 100ms linear",
              display: "block",
              lineHeight: "18px",
              fontSize: "17px",
              textAlign: "center",
              "& :hover": {
                fontSize: "34px"
              }
            }}
          />
        </Box>
      )}
      <Box
        component="li"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0
        }}
      />
    </Box>
  );
};
