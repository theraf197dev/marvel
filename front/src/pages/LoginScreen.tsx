import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { BACK_URL } from "../constants";
import { AuthContext } from "../context/AuthContext";
import { authTypes } from "../types/authTypes";

const LoginScreen = () => {
  const { dispatch } = useContext(AuthContext);
  const [loginInput, setLoginInput] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    
    if(loginInput === '')
      return;

    const url = BACK_URL.concat('/user');
    
    await axios.get(url, {params : {username: loginInput}})
      .then(async res =>{
        if(res.data.length <= 0){
          await axios.post(url, {username: loginInput})
            .then(res =>{
              if(res.data){
                dispatch({ type: authTypes.login });
                localStorage.setItem("username", loginInput);
                localStorage.setItem("userId", res.data.id);
                navigate("/");
              }
            });
        }
        else{
          dispatch({ type: authTypes.login });
          localStorage.setItem("username", loginInput);
          localStorage.setItem("userId", res.data[0].userId);
          navigate("/");
        }
      })
      .catch(e => console.log(e.message));
  };

  return (
    <form className="container mt-5 text-center" onSubmit={handleLogin}>
      <img className="dismiss-img" src="/assets/marvel_login.gif" alt="animacion" />
      <h1 className="my-3">Login Screen</h1>
      <input onChange={event => setLoginInput(event.target.value)} type="text" className="form-control black-background" maxLength={10} placeholder="Local hero username" aria-label="Local hero username" aria-describedby="button-addon"></input>
      <button type="submit" className="btn custom-button spacing">
        Login
      </button>
    </form>
  );
};

export default LoginScreen;
