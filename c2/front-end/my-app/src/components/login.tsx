import {
  Button,
  Container,
  createMuiTheme,
  makeStyles,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { pink } from "@material-ui/core/colors";

import { Alert } from "@material-ui/lab";

import  { ReactElement,  useState } from "react";
import {  useQAContext } from "../QAContext";


interface Props {}

export default function Login({}: Props) {
  const {loginUser}=useQAContext()
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState({
    code: 0,
    message: "",
  });
  const handleChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const LoginUser = async (e: any) => {
    e.preventDefault();
    const result = await loginUser(
      {
        username: user.username,
        password: user.password,
      }
    );
    console.log(result);
    setUser({ username: "", password: "" });
    let msg = result.status !== 200 ? result.response.data : "";
    setStatus({ code: result.status, message: msg });
  };

  const useStyles = makeStyles((theme) => ({
    margin: {
      display: "block",
      margin: "1vw 0vw",
      width: 250,
      marginLeft: "auto",
      marginRight: "auto",
    },
    container: {
      border: "1px solid white",
      boxShadow: "1px 1px 3px 1px gray",
      borderRadius: "5% 5%",
      padding: "2vw 0.5vw",
      width: "max-content",
      marginLeft: "auto",
      marginRight: "auto",
    },
    button: {
      marginLeft: "5.9vw",
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <form onSubmit={LoginUser}>
        <Container className={classes.container}>
          <h2 style={{ color: "#DB7C8C", textAlign: "center" }}>Login</h2>
          <ThemeProvider
            theme={createMuiTheme({
              palette: {
                primary: pink,
              },
            })}
          >
            <TextField
              label="User name"
              placeholder="Enter username"
              name="username"
              autoComplete="off"
              type="text"
              onChange={handleChange}
              className={classes.margin}
              required
              value={user.username}
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              name="password"
              autoComplete="off"
              type="password"
              onChange={handleChange}
              className={classes.margin}
              value={user.password}
              required
            />
            <Button
              variant="contained"
              size="large"
              color="secondary"
              type="submit"
              className={classes.button}
            >
              Login
            </Button>
          </ThemeProvider>

          {status.code === 200 ? (
            <div className="message">
              <Alert severity="success">Login successful</Alert>
            </div>
          ) : status.code !== 0 ? (
            <div className="message">
              <Alert severity="error">Username or password incorrect</Alert>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </form>
    </div>
  );
}
