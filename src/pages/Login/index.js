import { useState } from "react";
import {
  Container,
  TextField,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./style";
import { login } from "../../store/slices/admin";
import { useSelector, useDispatch } from "react-redux";
import { withAuth } from "../../hoc/withAuth";

export const Login = withAuth(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.admin.loginLoading);

  const changeEmailHandler = (e) => setEmail(e.target.value);
  const changePasswordHandler = (e) => setPassword(e.target.value);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container>
      <Paper component="form" className={classes.form} onSubmit={loginHandler}>
        <Typography variant="h4">Login</Typography>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={changeEmailHandler}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={changePasswordHandler}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Paper>
    </Container>
  );
})(false);
