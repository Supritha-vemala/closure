import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { QAContext } from "../QAContext";
import SaveIcon from "@material-ui/icons/Save";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import ThumbDownRoundedIcon from "@material-ui/icons/ThumbDownRounded";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import {
  addNewAnswerToQuestion,
  getAnswersForQuestion,
  voteAnswerInDB,
} from "../services";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Avatar, Button, TextareaAutosize } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { voteQuestionInDB } from "../services";
import { pink } from "@material-ui/core/colors";
interface Props {}
export default function QuestionDetails({}: Props): ReactElement {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& > *": {
          margin: theme.spacing(1),
          padding: theme.spacing(1),
        },
      },
      form: {
        marginTop: "2vw",
        boxShadow: "1px 1px 3px 1px gray",
        width: "max-content",
      },
      button: {
        //marginButtom:theme.spacing(2)
      },
      large: {
        width: theme.spacing(6.5),
        height: theme.spacing(6.5),
      },
      vote: {
        marginRight: "0.5vw",
        float: "right",
        padding: "0.2vw",
      },
      table: {
        width: "70vw",
      },
    })
  );

  const classes = useStyles();
  const params: any = useParams();
  const { state, dispatch } = useContext(QAContext);
  const [question, setQuestion] = useState<any>({ question: "" });
  const [answers, setAnswers] = useState([]);
  const [status, setStatus] = useState({
    code: 0,
    message: "",
  });
  useEffect(() => {
    let qts = state.questions.filter((q: any) => q._id === params.id);
    setQuestion(qts[0]);
    if (question) {
      getAnswersForQuestion(params.id).then((result) => {
        if (result.status === 200) setAnswers(result.data);
      });
    } else {
      console.log("question not found");
    }
  }, [state.questions]);
  const [newAnswer, setNewAnswer] = useState("");
  const handleChange = (e: any) => {
    setNewAnswer(e.target.value);
  };
  const addNewAnswer = async (e: any) => {
    e.preventDefault();
    if (state.activeUser !== null) {
      const result = await addNewAnswerToQuestion(
        state,
        dispatch,
        newAnswer,
        params.id
      );
      setNewAnswer("");
      console.log(result);
      let msg =
        result.status !== 201 ? result.response.data : "answered the question";
      setStatus({ code: result.status, message: msg });
    } else {
      setStatus({ code: -1, message: "login to add answer" });
    }
  };
  const voteQuestion = async (type: any) => {
    if (state.activeUser !== null) {
      const result = await voteQuestionInDB(
        dispatch,
        state,
        { type: type },
        params.id
      );

      let msg =
        result.status !== 200 ? result.response.data : "" + type + "d question";
      setStatus({ code: result.status, message: msg });
    } else {
      setStatus({ code: -1, message: "login to vote" });
    }
  };

  const voteAnswer = async (type: any, id: any) => {
    if (state.activeUser !== null) {
      const result = await voteAnswerInDB(dispatch, state, { type: type }, id);
      let msg =
        result.status !== 200 ? result.response.data : "" + type + "d answer";
      setStatus({ code: result.status, message: msg });
    } else {
      setStatus({ code: -1, message: "login to vote" });
    }
  };

  return (
    <div className="questionDisplay">
      <Paper
        style={{
          width: "max-content",
          padding: "0.5vw",
          marginBottom: "1vw",
          borderLeft: "1vw solid #DB7C8C",
          backgroundColor: "#FCF4F4",
        }}
      >
        <table className={classes.table}>
          <tr>
            <h4 style={{ textAlign: "center", display: "inline-block" }}>
              {question.question}
            </h4>
          </tr>
          <tr className={classes.vote}>
            <span className={classes.vote}>
              {question.downVotes ? question.downVotes.length : ""}
              <ThumbDownOutlinedIcon
                style={{ marginLeft: "0.1vw" }}
                onClick={(e: any) => voteQuestion("downVote")}
              ></ThumbDownOutlinedIcon>
            </span>
            <span className={classes.vote}>
              {question.upVotes ? question.upVotes.length : ""}
              <ThumbUpAltOutlinedIcon
                style={{ marginLeft: "0.1vw" }}
                onClick={(e: any) => voteQuestion("upVote")}
              ></ThumbUpAltOutlinedIcon>
            </span>
          </tr>
        </table>
      </Paper>
      {status.code === 201 || status.code === 200 ? (
        <div className="message">
          <Alert severity="success">{status.message}</Alert>
        </div>
      ) : status.code !== 0 ? (
        <div className="message">
          <Alert severity="error">{status.message}</Alert>
        </div>
      ) : (
        <></>
      )}
      <h5 style={{ textAlign: "left" }}>Answers</h5>
      <div className={classes.root} style={{ marginTop: "1vw" }}>
        {answers.map((answer: any) => {
          return (
            <Paper
              style={{
                width: "75vw",
                borderLeft: "1vw solid #DB7C8C",
                backgroundColor: "#FCF4F4",
              }}
            >
              <table className={classes.table}>
                <tr>
                  <span>{answer.answer}</span>
                </tr>
                <tr>
                  <span className={classes.vote}>
                    {answer.downVotes ? answer.downVotes.length : ""}
                    <ThumbDownOutlinedIcon
                      style={{ marginLeft: "0.1vw" }}
                      onClick={(e: any) => voteAnswer("downVote", answer._id)}
                    ></ThumbDownOutlinedIcon>
                  </span>
                  <span className={classes.vote}>
                    {answer.upVotes ? answer.upVotes.length : ""}
                    <ThumbUpAltOutlinedIcon
                      style={{ marginLeft: "0.1vw" }}
                      onClick={(e: any) => voteAnswer("upVote", answer._id)}
                    ></ThumbUpAltOutlinedIcon>
                  </span>
                </tr>
              </table>
            </Paper>
          );
        })}
        <form onSubmit={addNewAnswer} className={classes.form}>
          <p style={{ fontSize: "1.5vw" }}>Enter your answer</p>
          <TextareaAutosize
            aria-label="minimum height"
            required
            value={newAnswer}
            rowsMin={5}
            style={{ width: "74vw" }}
            placeholder="Enter your answer"
            onChange={handleChange}
          />
          <br></br>
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            className={classes.button}
            startIcon={<SaveIcon />}
            type="submit"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
