import React, { useContext, useReducer } from "react";
import myReducer from "./reducer";
import {loginUser as serviceLogin} from "./services";
const QAContext: any = React.createContext({});

interface Props {
  children?: any;
}
function QAContextProvider(props: Props) {
  const [state, dispatch] = useReducer(myReducer, {
    activeUser: null,
    questions: [],
    searchData: [],
  });
  const wrapper = (serviceFunction: any) => {
    return (...params: any[]) => {
      return serviceFunction(...params, dispatch);
    };
  };
  let loginUser=wrapper(serviceLogin)
  return (
    <QAContext.Provider
      value={{ state, dispatch,loginUser}}
    >
      {props.children}
    </QAContext.Provider>
  );
}

function useQAContext(): any {
  return useContext(QAContext);
}
export { QAContext, QAContextProvider, useQAContext };
