import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {Container} from "@material-ui/core"
import { useState, useContext } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";

import { pink } from "@material-ui/core/colors";
import { QAContext } from "../QAContext";
import { addQuestionToDB } from "../services";

interface Props {}

export default function AddQuestion({}: Props) {
  const { dispatch ,state} = useContext(QAContext);
  const [question, setQuestion] = useState<any>({
    question: "",
    categories:[],
  });
  const [categoryName, setCategoeyName] = useState("");
  const handleCategoyName = () => {
    if (categoryName !== "") {
      setQuestion({
        ...question,
        categories: [...question.categories, categoryName],
      });
      setCategoeyName("");
    }
  };
  const [status, setStatus] = useState({
    code: 0,
    message: "",
  });
  const handleChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "categoryName") {
      setCategoeyName(value);
    } else setQuestion({ ...question, [name]: value });
  };

  const addQuestion = async (e: any) => {
    e.preventDefault();
    let result;
    if (state.activeUser !== null) {
      console.log(question)
      result = await addQuestionToDB(dispatch, question,state.activeUser);
      console.log(result.data)
      setQuestion({ question: "", categories: [] });
      let msg = result.status !== 201 ? result.response.data : result.data;
      setStatus({ code: result.status, message: msg });
    } else {
      setStatus({ code: -1, message: "login to add question" });
    }
  };
  const useStyles = makeStyles((theme) => ({
    margin: {
      marginTop: theme.spacing(2),
      width: 500,
    },
    container: {
      border: "1px solid white",
      boxShadow: "1px 1px 3px 1px gray",
      borderRadius: "5% 5%",
      padding: "2.5vw 2vw",
      width: "max-content",
      marginLeft: "auto",
      marginRight: "auto",
    },
    button: {
      marginLeft: "6vw",
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <form onSubmit={addQuestion}>
        <Container className={classes.container}>
        <h2 style={{ color: "#DB7C8C",textAlign:"center" }}>Enter question</h2>
        <ThemeProvider
          theme={createMuiTheme({
            palette: {
              primary: pink,
            },
          })}
        >
          <TextField
            label="Question"
            placeholder="Enter question"
            name="question"
            autoComplete="off"
            type="text"
            onChange={handleChange}
            className={classes.margin}
            required
            value={question.question}
          />

          <div>
            <TextField
              label="category"
              placeholder="Enter category"
              autoComplete="off"
              type="text"
              name="categoryName"
              onChange={handleChange}
              className={classes.margin}
              value={categoryName}
            />
            <Fab
              color="primary"
              size="small"
              aria-label="add"
              onClick={handleCategoyName}
              style={{ marginTop: "2vw" }}
            >
              <AddIcon />
            </Fab>
          </div>
          <div style={{margin:"1vw 0vw"}}>
          Catergories added are
              {
                question.categories.map((catego:any)=><span style={{border:"1px solid back",padding:"0.5vw",margin:"0.5vw"}}>{catego}</span>)
              }
          </div>
          <div style={{ marginTop: "2vw" }}>
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
          </div>
        </ThemeProvider>
        {status.code === 201 ? (
          <div className="message">
            <Alert severity="success">Question added</Alert>
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
}
