import express from "express";
import {checkAuthoraiztion} from "../Controller/users-controller"
const router = express.Router();
import {getAllQuestions,getAllQuestionsLikedByGivenUser,getAllQuestionsGivenByUser,upVoteOrDownVote,addNewQuestion,getQuestionByID,getQuestionsByCategory,getQuestionsByText} from "../Controller/question-controller"

router.get("/",(req,res)=>{

    getAllQuestions(req,res)
})

router.get("/askedby/:userid",(req,res)=>{
    console.log("here in routes")
    getAllQuestionsGivenByUser(req,res)
})
router.post("/",checkAuthoraiztion,(req,res)=>{
    addNewQuestion(req,res)
})

router.get("/category/:category",(req,res)=>{
    getQuestionsByCategory(req,res)
})

router.get("/simpleSearch/:text",(req,res)=>{
    getQuestionsByText(req,res)
})

router.get("/by/:id",(req,res)=>{
    getQuestionByID(req,res)
})

router.patch("/:id",checkAuthoraiztion,(req,res)=>{
    upVoteOrDownVote(req,res)
})

router.get("/upvotedby/user/:userid",(req,res)=>{
    getAllQuestionsLikedByGivenUser(req,res)
})


export default router