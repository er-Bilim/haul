import { pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${pink[500]}}`,
          scrollbarWidth: "thin",

          "&::-webkit-scrollbar": {
            width: 4,
            height: 4,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: pink[900],
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: pink[500],
            borderRadius: 1,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: pink[500],
          },
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "Space Grotesk",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

export default theme;
