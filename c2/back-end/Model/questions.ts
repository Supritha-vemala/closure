import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
    question: {
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
    type: Array
  },
  categories:{
      type:Array,
      required:true
  }
});

const questionsModel = mongoose.model("questions", questionsSchema);

export { questionsModel };
