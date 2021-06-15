const myReducer=(state,action)=>{
    switch(action.type){
        case "activeUser":
            return {...state,activeUser:action.payload}
        case "setQuestions":
            return {...state,questions:action.payload}
        case "addQuestion":
            return {...state,questions:[...state.questions,action.payload]}
        case "logout":
            return {...state,activeUser:null}
        case "clearSearch":
            return {...state,searchData:[]}
        case "searchData":
            return {...state,searchData:action.payload}
        /* case "setUserQuestions":
            return {...state,userQuestions:action.payload} */
        default: return state
    }
}

export default myReducer