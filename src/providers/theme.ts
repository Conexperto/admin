import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme();

export const theme = createTheme({
  components: {
    MuiFab: {
      variants: [
        {
          props: { color: "save" },
          style: {
            color: defaultTheme.palette.success.contrastText,
            backgroundColor: defaultTheme.palette.success.light,
            "&:hover": {
              backgroundColor: defaultTheme.palette.success.main,
            },
          },
        },
        {
          props: { color: "remove" },
          style: {
            color: defaultTheme.palette.error.contrastText,
            backgroundColor: defaultTheme.palette.error.light,
            "&:hover": {
              backgroundColor: defaultTheme.palette.error.main,
            },
          },
        },
      ],
    },
  },
});

declare module "@mui/material/Fab" {
  interface FabPropsColorOverrides {
    save: true;
    remove: true;
  }
}
