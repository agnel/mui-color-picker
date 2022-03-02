import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { ColorOption } from "./ColorOption";

export interface ColorPickerProps {
  palette?: ColorPaletteType;
  onSelect?: (
    event: React.MouseEvent | React.TouchEvent,
    color: string
  ) => void;
  value?: string;
}

export type ColorPaletteType = { [key: string]: string };

const createGroupsOf = (arr: any, perGroup: number): any => {
  const numGroups = Math.ceil(arr.length / perGroup);
  return new Array(numGroups)
    .fill("")
    .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
};

export const ColorPicker = (props: ColorPickerProps) => {
  const palette = props.palette || {
    tomato: "#D50000",
    flamingo: "#E67C73",
    tangerine: "#F4511E",
    banana: "#F6BF26",
    sage: "#33B679",
    basil: "#0B8043",
    peacock: "#039BE5",
    blueberry: "#3F51B5",
    lavender: "#7986CB",
    grape: "#8E24AA",
    graphite: "#616161"
  };

  const [selected, setSelected] = useState(
    palette[props.value ? props.value : "peacock"]
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onColorSelect: (event: React.MouseEvent, color: string) => void = (
    event: React.MouseEvent,
    color: string
  ) => {
    setSelected(color);
    if (props.onSelect) {
      props.onSelect(event, color);
    }
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const buildPaletteOptions = (
    palette: ColorPaletteType,
    selectedColor: string
  ): Array<Array<React.ReactNode>> => {
    const list = Object.keys(palette).map((key) => {
      return (
        <ColorOption
          key={key}
          color={`${palette[key]}`}
          selected={palette[key] === selectedColor}
          onClick={onColorSelect}
        />
      );
    });

    const groups = createGroupsOf(list, 2);

    const options = groups.map((group: Array<JSX.Element[]>, index: number) => {
      return (
        <Box
          key={`group-${index}`}
          sx={{
            px: "0.5rem",
            py: "0.2rem",
            overflow: "auto",
            display: "flex"
          }}
        >
          {group}
        </Box>
      );
    });

    return options;
  };

  return (
    <div className="MuiColorPicker-root">
      <Button
        className="MuiColorPickerButton-root"
        id="color-picker-button"
        aria-controls={open ? "color-picker-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
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
            backgroundColor: selected
          }}
        >
          <Box
            component="div"
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
      </Button>
      <Menu
        id="color-picker-menu"
        aria-labelledby="color-picker-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        {buildPaletteOptions(palette, selected)}
      </Menu>
    </div>
  );
};
