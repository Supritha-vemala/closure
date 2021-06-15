import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { QAContext } from "../QAContext";
import UserMenu from "./userMenu";
interface Props{

}
export default function Header(props:Props) {
  const {state} = useContext(QAContext)
  return (
    <div className="header">
        <h2 style={{display:"inline-block",margin:"1vw",marginTop:"3vw"}}>Query clarify</h2>
      <div className="navGroup">
        <Link className="navLink" to="/">
          Home
        </Link>
        {state.activeUser===null?<Link className="navLink" to="/login">Login</Link>: <UserMenu></UserMenu>}
        {state.activeUser===null?<Link className="navLink" to="/register">
          Regsiter
        </Link>:<></>}
      </div>
    </div>
  );
}
