import { questionsModel } from "../Model/questions";

const getAllQuestions = async (req: any, res: any) => {
  try {
    const questions = await questionsModel.find();
    res.status(200).send(questions);
    return questions;
  } catch (err) {
    res.status(404).send("could not find questions");
  }
};

const addNewQuestion = async (req: any, res: any) => {
  try {
    let newQuestion: any = new questionsModel();
    newQuestion = {
      question: req.body.question,
      categories: req.body.categories,
      userID: req.user._id,
    };
    const result = await questionsModel.create(newQuestion);
    res.status(201).send(result);
  } catch (err) {
    res.status(403).send(`unable to add a question ${err}`);
  }
};

const getQuestionByID = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const question = await questionsModel.find({ _id: id });
    res.status(200).send(question);
  } catch (err) {
    res.status(404).send(`could not find the question, ${err.message}`);
  }
};

const getQuestionsByCategory = async (req: any, res: any) => {
  try {
    const category = req.params.category;
    const questions = await questionsModel.find({
      categories: { $regex: category, $options: "i" },
    });
    res.status(200).send(questions);
  } catch (err) {
    res.status(404).send(`Could not find questions, ${err.message}`);
  }
};

const getQuestionsByText = async (req: any, res: any) => {
  try {
    const text = req.params.text;
    const questions = await questionsModel.find({
      question: { $regex: text, $options: "i" },
    });
    res.status(200).send(questions);
  } catch (err) {
    res.status(404).send(`Could not find questions, ${err.message}`);
  }
};

const upVoteOrDownVote = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const Question: any = await questionsModel.findOne({ _id: id });
    if (Question) {
      const option = req.body;
      if (option.type === "upVote") {
        const user = await questionsModel.findOne({$and:[{_id:Question._id},{upVotes: req.user._id.toString()}]});
        if (!user) {
          let updateObject: any = new questionsModel();

          Question.upVotes.push(req.user._id.toString());
          updateObject = {
            question: Question.question,
            userID: Question.userID,
            downVotes: Question.downVotes,
            categories: Question.categories,
            upVotes: Question.upVotes,
          };
          const result = await questionsModel.findByIdAndUpdate(
            id,
            updateObject,
            {
              new: true,
            }
          );
          res.status(200).send(result);
          console.log(updateObject);
        } else {
          res.status(404).send("You already voted");
        }
      } else {
        if (option.type === "downVote") {
          const user = await questionsModel.findOne({$and:[{_id:Question._id},{downVotes: req.user._id.toString()}]});
          if (!user) {
            let updateObject: any = new questionsModel();
            Question.downVotes.push(req.user._id.toString());
            updateObject = {
              question: Question.question,
              userID: Question.userID,
              categories: Question.categories,
              upVotes: Question.upVotes,
              downVotes: Question.downVotes.toString(),
            };
            const result = await questionsModel.findByIdAndUpdate(
              id,
              updateObject,
              {
                new: true,
              }
            );
            res.status(200).send(result);
          } else {
            res.status(404).send("You already voted");
          }
        }
      }
    } else {
      res.status(404).send("question id not found");
    }
  } catch (err) {
    res.status(404).send(`Could not find questions, ${err.message}`);
  }
};

const getAllQuestionsGivenByUser = async (req: any, res: any) => {
  try {
    let userID = req.params.userid;
    console.log(userID)
    const questions = await questionsModel.find({userID:userID});
    res.status(200).send(questions);
  } catch (err) {
    res.status(404).send(err.messgae);
  }
};

const getAllQuestionsLikedByGivenUser = async (req: any, res: any) => {
  try {
    let userID = req.params.userid;
     const likedQuestions=await questionsModel.find({upVotes:{$elemMatch:{$eq:userID}}})
    res.status(200).send(likedQuestions);
  } catch (err) {
    res.status(404).send(err.message);
  }
};
export {
  getAllQuestions,
  upVoteOrDownVote,
  addNewQuestion,
  getQuestionByID,
  getQuestionsByCategory,
  getQuestionsByText,
  getAllQuestionsGivenByUser,
  getAllQuestionsLikedByGivenUser,
};
