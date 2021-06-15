import mongoose from "mongoose";

const answersSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  questionID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  upVotes: {
    type: Array
  },
  downVotes: {
    type:Array
  },
});

const answersModel = mongoose.model("answers", answersSchema);

export { answersModel };
