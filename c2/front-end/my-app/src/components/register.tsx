import { Container, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";
import SaveIcon from "@material-ui/icons/Save";
import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { registerUserToDB } from "../services";
import { useHistory } from "react-router";
interface Props {}

export const Register = (props: Props) => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    username: "",
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
  const registerUser = async (e: any) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      const result = await registerUserToDB({
        email: user.email,
        password: user.password,
        username: user.username,
        name: user.name,
      });
      setStatus({ code: result.status, message: result.data });
      setUser({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        username: "",
      });
      let msg = result.status !== 201 ? result.response.data : result.data;
      setStatus({ code: result.status, message: msg });
    } else {
      setStatus({ code: -1, message: "Passwords dosen't match" });
    }
  };

  const useStyles = makeStyles((theme) => ({
    margin: {
      marginTop: theme.spacing(2),
      display: "block",
      width: 250,
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
      marginTop: "0.5vw",
      marginLeft: "5vw",
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <form onSubmit={registerUser}>
        <Container className={classes.container}>
          <h2 style={{ color: "#DB7C8C", textAlign: "center" }}>Register</h2>
          <ThemeProvider
            theme={createMuiTheme({
              palette: {
                primary: pink,
              },
            })}
          >
            <TextField
              label="Name"
              placeholder="Enter your name"
              name="name"
              autoComplete="off"
              type="text"
              onChange={handleChange}
              className={classes.margin}
              required
              value={user.name}
            />
            <TextField
              label="User name"
              placeholder="Enter username"
              name="username"
              autoComplete="off"
              type="text"
              onChange={handleChange}
              className={classes.margin}
              value={user.username}
            />
            <TextField
              label="Email"
              placeholder="Enter email ID"
              name="email"
              autoComplete="off"
              type="text"
              onChange={handleChange}
              className={classes.margin}
              required
              value={user.email}
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
            <TextField
              label="Password"
              placeholder="Confirm password"
              name="confirmPassword"
              autoComplete="off"
              type="password"
              onChange={handleChange}
              className={classes.margin}
              value={user.confirmPassword}
            />
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.button}
              startIcon={<SaveIcon />}
              type="submit"
            >
              Save
            </Button>
          </ThemeProvider>

          {status.code === 201 ? (
            <div className="message">
              <Alert severity="success">Registration successful</Alert>
            </div>
          ) : status.code !== 0 ? (
            <div className="message">
              <Alert severity="error">{status.message}</Alert>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </form>
    </div>
  );
};

export default Register;
