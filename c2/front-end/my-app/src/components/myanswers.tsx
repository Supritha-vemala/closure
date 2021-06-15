import {
  Card,
  CardContent,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { QAContext } from "../QAContext";
import {
  getAllAnswersGivnByUser,
  getAllAnswersUpVotedByUser,
} from "../services";

interface Props {}

const useStyles = makeStyles({
  root: {
    width: "60vw",
    marginTop: "1vw",
    borderLeft: "1vw solid #DB7C8C",

    backgroundColor: "#FCF4F4",
  },
  title: {
    fontSize: "1.5vw",
  },
});
export default function MyAnswers({}: Props): ReactElement {
  const { state } = useContext(QAContext);
  const [myAnswers, setmyAnswers] = useState([]);
  const location: any = useLocation();
  useEffect(() => {
    switch (location.state.flag) {
      case "myAnswers":
        getAllAnswersGivnByUser(state).then((res: any) => {
          setmyAnswers(res.data);
        });
        break;
      case "myUpVotedAnswers":
        getAllAnswersUpVotedByUser(state).then((result) => {
          setmyAnswers(result.data);
        });
        break;
    }
  }, [location.state]);
  const classes = useStyles();
  return (
    <div>
      <Container style={{ marginLeft: "15vw" }}>
        <h3>My Answers</h3>
        {myAnswers.map((answer: any) => {
          return (
            <Link
              to={`/details/${answer.questionID}`}
              style={{ textDecoration: "none" }}
            >
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {answer.answer}
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
