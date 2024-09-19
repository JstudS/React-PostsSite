import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../routes/routes";
import { AuthContext } from "../context";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext)

  if(isLoading){
    return <Loader />
  }
    return (
      isAuth 
        ? <Routes>
            {privateRoutes.map( (route, index) => <Route key={index}  path={route.path} element={<route.component />}/>)}
            <Route path="*" element={<Navigate to='/posts' />} />
          </Routes>
        : <Routes>
            {publicRoutes.map( (route, index) => <Route key={index}  path={route.path} element={<route.component />}/>)}
            <Route path="*" element={<Navigate to='/login' />} />
          </Routes>
    )
}

export default AppRouter
