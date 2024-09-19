import React, { useContext } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";

function Login() {
  const {setIsAuth} = useContext(AuthContext)
  const login = event => {
    setIsAuth(true)
    localStorage.setItem('auth', 'ture')
  }
  return (
      <div>
        <h1>Login Page</h1>
        <form >
          <MyInput type="text" placeholder="Enter the login"/>
          <MyInput type="text" placeholder="Enter the password"/>
          <MyButton onClick={login}>Enter</MyButton>
        </form>
      </div>
    )      
  }
  
  export default Login;