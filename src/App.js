import React, { Component } from "react";
import { ColorPicker } from "./components/ColorPicker";
import "./App.css";
import { Typography } from "@mui/material";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Color Picker Demo</h1>
        <br />
        <ColorPicker />
        <br />
        <Typography variant="body2">Crafted by Agnel Waghela</Typography>
      </div>
    );
  }
}

export default App;
