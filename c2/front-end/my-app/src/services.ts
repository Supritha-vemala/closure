import axios from "axios";
const registerUserToDB = async (user: any) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/api/users/register",
      user
    );
    return result;
  } catch (err) {
    return err;
  }
};

const loginUser = async (user: any, dispatch: any) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/api/users/login",
      user
    );
    dispatch({ type: "activeUser", payload: result.data });
    console.log(result)
    return result;
  } catch (err) {
    return err;
  }
};

const getQuestions = async (dispatch: any) => {
  try {
    const result = await axios.get("http://localhost:5000/api/questions");
    dispatch({ type: "setQuestions", payload: result.data });
    return result;
  } catch (err) {
    return err;
  }
};

const getAnswersForQuestion = async (id: any) => {
  try {
    const result = await axios.get(
      `http://localhost:5000/api/answers/ofquestion/${id}`
    );
    return result;
  } catch (err) {
    return err;
  }
};

const addNewAnswerToQuestion = async (
  state: any,
  dispatch: any,
  answer: any,
  id: any
) => {
  try {
    const result = await axios.post(
      `http://localhost:5000/api/answers/forquestion/${id}`,
      { answer: answer },
      {
        headers: {
          authorization: state.activeUser.token,
        },
      }
    );
    getQuestions(dispatch);
    return result;
  } catch (err) {
    return err;
  }
};

const addQuestionToDB = async (
  dispatch: any,
  question: any,
  activeUser: any
) => {
  try {
    const result = await axios.post(
      `http://localhost:5000/api/questions`,
      question,
      {
        headers: {
          authorization: activeUser.token,
        },
      }
    );
    dispatch({ type: "addQuestion", payload: result.data });
    return result;
  } catch (err) {
    return err;
  }
};

const voteQuestionInDB = async (
  dispatch: any,
  state: any,
  type: any,
  id: any
) => {
  try {
    console.log("in function");
    const result = await axios.patch(
      `http://localhost:5000/api/questions/${id}`,
      type,
      {
        headers: {
          authorization: state.activeUser.token,
        },
      }
    );

    getQuestions(dispatch);
    return result;
  } catch (err) {
    return err;
  }
};

const voteAnswerInDB = async (
  dispatch: any,
  state: any,
  type: any,
  id: any
) => {
  try {
    const result = await axios.patch(
      `http://localhost:5000/api/answers/${id}`,
      type,
      {
        headers: {
          authorization: state.activeUser.token,
        },
      }
    );
    getQuestions(dispatch);
    return result;
  } catch (err) {
    return err;
  }
};

const getSearchDetails = async (
  searchData: any,
  choice: any,
  dispatch: any
) => {
  try {
    let result: any;
    switch (choice) {
      case "id":
        result = await axios.get(
          `http://localhost:5000/api/questions/by/${searchData}`
        );

        dispatch({ type: "searchData", payload: result.data });
        return result;
      case "category":
        result = await axios.get(
          `http://localhost:5000/api/questions/category/${searchData}`
        );
        dispatch({ type: "searchData", payload: result.data });
        return result;
      case "text":
        result = await axios.get(
          `http://localhost:5000/api/questions/simpleSearch/${searchData}`
        );
        dispatch({ type: "searchData", payload: result.data });
        return result;
    }
  } catch (err) {
    return err;
  }
};

const getAllQuestionsAskedByUser = async (state: any, dispatch: any) => {
  try {
    const myQuestions = await axios.get(
      `http://localhost:5000/api/questions/askedby/${state.activeUser.user._id}`
    );
    console.log(myQuestions)
    // dispatch({ type: "setUserQuestions", payload: myQuestions.data });
    return myQuestions;
  } catch (err) {
    return err;
  }
};

const getAllAnswersGivnByUser = async (state: any) => {
  try {
    const myAnswers = await axios.get(
      `http://localhost:5000/api/answers/givenby/${state.activeUser.user._id}`
    );
    console.log(myAnswers.data);
    return myAnswers;
  } catch (err) {
    return err;
  }
};

const getAllQuestionsUpVotedByUser = async (state: any) => {
  try {
    const likedQuestions = await axios.get(
      `http://localhost:5000/api/questions/upvotedby/user/${state.activeUser.user._id}`
    );
    console.log(likedQuestions);
    return likedQuestions;
  } catch (err) {
    return err;
  }
};

const getAllAnswersUpVotedByUser = async (state: any) => {
  try {
    const likedAnswers = await axios.get(
      `http://localhost:5000/api/answers/upvotedby/user/${state.activeUser.user._id}`
    );
    return likedAnswers;
  } catch (err) {
    return err;
  }
};
export {
  getSearchDetails,
  voteAnswerInDB,
  voteQuestionInDB,
  addQuestionToDB,
  registerUserToDB,
  loginUser,
  getQuestions,
  getAnswersForQuestion,
  addNewAnswerToQuestion,
  getAllQuestionsAskedByUser,
  getAllAnswersGivnByUser,
  getAllQuestionsUpVotedByUser,
  getAllAnswersUpVotedByUser,
};
