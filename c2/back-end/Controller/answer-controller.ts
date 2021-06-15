import { questionsModel } from "../Model/questions";
import { answersModel } from "../Model/answers";
const getAnswersByQuestionID = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const Question: any = await questionsModel.findOne({ _id: id });
    if (Question) {
      const answers = await answersModel.find({ questionID: id });
      res.status(200).send(answers);
    } else {
      res.status(404).send("question not found");
    }
  } catch (err) {
    res.status(404).send(`could not find answers for the question ${err}`);
  }
};

const addNewAnswer = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const Question: any = await questionsModel.findOne({ _id: id });
    if (Question) {
      let newAnswer: any = new answersModel();
      newAnswer = {
        questionID: id,
        answer: req.body.answer,
        userID: req.user._id,
      };
      const result = await answersModel.create(newAnswer);
      res.status(201).send(result);
    } else {
      res.status(404).send("could not find the question");
    }
  } catch (err) {
    res.status(403).send(`unable to add an answer ${err}`);
  }
};
const upVoteOrDownVote = async (req: any, res: any) => {
  try {
    const id = req.params.answerid;
    const Answer: any = await answersModel.findOne({ _id: id });
    if (Answer) {
      const option = req.body;
      if (option.type === "upVote") {
        const user = await answersModel.findOne({$and:[{_id:Answer._id},{upVotes: req.user._id.toString()}]});
        if (!user) {
          Answer.upVotes.push(req.user._id.toString());
          let updateObject: any = new answersModel();
          updateObject = {
            questionID: Answer.questionID,
            userID: Answer.userID,
            downVotes: Answer.downVotes,
            answer: Answer.answer,
            upVotes: Answer.upVotes,
          };
          const result = await answersModel.findByIdAndUpdate(
            id,
            updateObject,
            {
              new: true,
            }
          );
          res.status(200).send(result);
        } else {
          res.status(404).send("you voted already");
        }
      } else {
        const user = await answersModel.findOne({$and:[{_id:Answer._id},{downVotes: req.user._id.toString()}]});
        if (!user) {
          Answer.downVotes.push(req.user._id.toString());
          let updateObject: any = new answersModel();
          updateObject = {
            questionID: Answer.questionID,
            userID: Answer.userID,
            answer: Answer.answer,
            upVotes: Answer.upVotes,
            downVotes: Answer.downVotes,
          };
          const result = await answersModel.findByIdAndUpdate(
            id,
            updateObject,
            {
              new: true,
            }
          );
          res.status(200).send(result);
        } else {
          res.status(404).send("you voted already");
        }
      }
    } else {
      res.status(404).send("answer id not found");
    }
  } catch (err) {
    res.status(404).send(`Could not find answer, ${err.message}`);
  }
};

const getAllAnswersByParticularUser = async (req: any, res: any) => {
  try {
    let userid: any = req.params.userID;
    const answers = await answersModel.find({ userID: userid });
    res.status(200).send(answers);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const getAllAnswersLikedByUser=async(req:any,res:any)=>{
  try{
    let userid=req.params.userid
    const likedAnswers=await answersModel.find({upVotes:{$elemMatch:{$eq:userid}}})
    console.log(likedAnswers);
    res.status(200).send(likedAnswers);
  }catch(err){
    res.status(404).send(err.message)
  }

}

export {
  addNewAnswer,
  getAnswersByQuestionID,
  upVoteOrDownVote,
  getAllAnswersByParticularUser,
  getAllAnswersLikedByUser,
};
