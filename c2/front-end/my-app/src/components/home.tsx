import React, { useEffect,useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { QAContext, useQAContext } from "../QAContext";

import {
 
  getAllQuestionsAskedByUser,
  getAllQuestionsUpVotedByUser,
  getQuestions,
} from "../services";
import { Link, useLocation } from "react-router-dom";
import { SearchField } from "./searchField";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "60vw",
    marginTop: "1vw",
    borderLeft: "1vw solid #DB7C8C",
    marginLeft: "10vw",
    backgroundColor: "#FCF4F4",
  },
  title: {
    fontSize: "1.5vw",
  },
});

export default function Home() {
  const {dispatch,state}=useQAContext()
  
  const [questions, setQuestions] = useState(state.questions);
  const classes = useStyles();
  const location: any = useLocation();
  useEffect(() => {
    getQuestions(dispatch).then((result:any) => {
      setQuestions(result.data);
    });
  }, []);
  useEffect(() => {
    if (location.state !== undefined) {
      switch (location.state.flag) {
        case "my-questions":
          console.log("in my questions")
          getAllQuestionsAskedByUser(state, dispatch).then((result) => {
            setQuestions(result.data);
          });
          break;
        case "myUpVotedQuestions":
          getAllQuestionsUpVotedByUser(state).then((result) => {
            setQuestions(result.data);
          });
      }
    }
  }, [location.state]);
  useEffect(() => {
    if (state.searchData.length === 0 && location.state === undefined) {
      setQuestions(state.questions);
    } else if (location.state === undefined) {
      setQuestions(state.searchData);
    }
  });
  return (
    <div>
      <div>
        {location.state !== undefined ? (
          <h3>My Questions</h3>
        ) : (
          <SearchField></SearchField>
        )}
      </div>
      <Container>
        {questions.map((question: any) => {
          return (
            <Link
              to={`/details/${question._id}`}
              style={{ textDecoration: "none" }}
            >
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {question.question}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </Container>
    </div>
  );
}
