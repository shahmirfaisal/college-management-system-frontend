import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  form: {
    width: "600px",
    maxWidth: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    padding: "20px 30px",
    "& > button": {
      marginTop: "30px",
    },
    "& > h4": {
      fontWeight: 600,
    },
  },
});
