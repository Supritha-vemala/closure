import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect } from "react";
import { QAContext } from "../QAContext";

interface Props {}

export default function Logout({}: Props) {
    const {dispatch} = useContext(QAContext)
    useEffect(() => {
        dispatch({type:"logout"})
    },[])
  return (
    <Alert severity="success" style={{width:"40vw",marginLeft:"30vw"}}>Logout successful</Alert>
  );
}
