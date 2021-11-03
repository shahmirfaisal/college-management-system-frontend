import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { useStyles } from "./style";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/admin";

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.admin.isLogin);

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h4"
          align="center"
        >
          College Management System
        </Typography>
        {isLogin ? (
          <Button className={classes.button} onClick={() => dispatch(logout())}>
            Logout
          </Button>
        ) : (
          <Button className={classes.button} component={Link} to="/login">
            Login as admin
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
