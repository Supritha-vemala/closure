import express from "express";
import {checkAuthoraiztion} from "../Controller/users-controller"
const router = express.Router();
import {addNewAnswer,getAllAnswersLikedByUser,getAnswersByQuestionID,upVoteOrDownVote,getAllAnswersByParticularUser} from "../Controller/answer-controller"

router.post("/forquestion/:id",checkAuthoraiztion,(req,res)=>{
    addNewAnswer(req,res)
})

router.get("/upvotedby/user/:userid",(req,res)=>{
    getAllAnswersLikedByUser(req,res)
})
router.get("/ofquestion/:id",(req,res)=>{
    getAnswersByQuestionID(req,res)
})

router.patch("/:answerid",checkAuthoraiztion,(req,res)=>{
    upVoteOrDownVote(req,res)
})

router.get("/givenby/:userID",(req,res)=>{
    getAllAnswersByParticularUser(req,res)
})

export default router