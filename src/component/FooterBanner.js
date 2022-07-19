import * as React from "react";
import { styled } from "@mui/material/styles";


import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import IconButton from "@mui/material/IconButton";
import {
  Box,
  Paper,
  Fab,
  IconButton,
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  InputBase,
  Divider,

} from "@mui/material";
import SearchInput from './SearchInput';



export default function FooterBanner() {
  const [url, setUrl] = React.useState(
    "test"
    );
    
    function urlHandle(e) {
      setUrl(e)
    }
React.useEffect(() => {
    console.log("url: ", url);

}, [url])

  return (
    <React.Fragment>
      <footer
        className="footer"
        style={{
          width: "100%",
          position: "fixed",
          bottom: "0",
          left: 0,
        }}
      >
        <CssBaseline />

        <AppBar
          position="static"
          color="primary"
          sx={{
            margin: "auto",
            top: "auto",
            left: "unset",
            right: "unset",
            bottom: 0,
            maxWidth: 420,
            width: "100%",
          }}
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer">
              <ArrowBackIosIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <SearchInput urlHandle={urlHandle} />


          </Toolbar>
        </AppBar>
      </footer>
    </React.Fragment>
  );
}
