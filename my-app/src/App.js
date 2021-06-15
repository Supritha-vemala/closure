import logo from "./logo.svg";
import "./App.css";
import Form from "./components/form";
import { ErrorBoundary } from "react-error-boundary";
import Person from "./components/person";
import FallBackComponent from "./components/fallBackComponent";
function App() {
  let str = "";
  const errHandler = (err, errinfo) => console.log(err);
  return (
    <div className="App">
      <Form></Form>
      <ErrorBoundary FallbackComponent={FallBackComponent}>
        <Person name={"supritha"}></Person>
        <Person name={null}></Person>
      </ErrorBoundary>
    </div>
  );
}

export default App;
