import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Header from "./components/headers";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Logout from "./components/logout"
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Login from "./components/login";
import Register from "./components/register";
import QuestionDetails from "./components/questionDetails";
import { pink } from "@material-ui/core/colors";
import { QAContextProvider } from "./QAContext";
import Home from "./components/home";
import AddQuestion from "./components/addQuestion";
import UserMenu from "./components/userMenu";
import MyAnswers from "./components/myanswers";
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
    marginTop: "3vw",
  },
  button: {
    marginTop: "3vw",
    marginLeft: "1vw",
    marginRight: "1vw",
    float: "right",
  },
  rootButton: {
    width: 500,
    float: "right",
    marginTop: "3vw",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <QAContextProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/register">
              <Register></Register>
            </Route>
            <Route exact path="/details/:id">
              <QuestionDetails></QuestionDetails>
            </Route>
            <Route exact path="/addQuestion">
              <AddQuestion></AddQuestion>
            </Route>
            <Route exact path="/logout">
              <Logout></Logout>
            </Route>
            <Route exact path="/myAnswers">
              {console.log("here")}
              <MyAnswers></MyAnswers>
            </Route>
          </Switch>
        </Router>
      </QAContextProvider>
    </div>
  );
}
