import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px 30px",
    "&>*:not(:first-child)": {
      marginTop: "20px",
    },
  },
  imgContainer: {
    height: "300px",
    backgroundColor: "rgba(0,0,0,0.1)",
    "& > img": {
      display: "block",
      height: "100%",
      width: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
});
