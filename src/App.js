import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Box, Button, Container } from "@material-ui/core";
import { Header } from "./components/Header/";
import { routes } from "./routes";
import { Route, useHistory, useLocation } from "react-router-dom";
import { setHistory } from "./utils";
import { NotificationContainer } from "react-notifications";
import { useSelector, useDispatch } from "react-redux";
import { isLogin } from "./store/slices/admin";

export const App = () => {
  const history = useHistory();
  const location = useLocation();
  const theme = createTheme({
    typography: {
      fontFamily: "'Dosis', sans-serif",
    },
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.admin.checkAuthLoading);

  useEffect(() => {
    setHistory(history);
    dispatch(isLogin());
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <ThemeProvider theme={theme}>
      <Header />

      {location.pathname != "/" && (
        <Container>
          <Box marginBottom={4}></Box>
          <Button
            onClick={() => history.goBack()}
            variant="outlined"
            color="secondary"
          >
            Go back
          </Button>
        </Container>
      )}

      <Box marginBottom={4}></Box>
      {routes.map((route) => (
        <Route {...route} />
      ))}
      <NotificationContainer />
    </ThemeProvider>
  );
};
