import { useEffect, useReducer } from "react";
import './App.css';

import LoginRouter from "./routes/LoginRouter";

import { AuthContext } from "./context/AuthContext";
import { AuthReducer } from "./reducers/AuthReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("log") as string) || { log: false };
};

const App = () => {
  const [log, dispatch] = useReducer(AuthReducer, {}, init);

  useEffect(() => {
    localStorage.setItem("log", JSON.stringify(log));
  }, [log]);

  return (
    <AuthContext.Provider value={{ log, dispatch }}>
      <LoginRouter />
    </AuthContext.Provider>
  );
};

export default App;
