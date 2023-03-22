import React, { createContext, useReducer, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AdminSignin from "./components/AdminSignin";
import AdminSignout from "./components/AdminSignout";
import Addbikes from "./components/dashboardComponents/Addbikes";
import Rentbikereports from "./components/dashboardComponents/Rentbikereports";
import Availableusers from "./components/dashboardComponents/Availableusers";
import Getrentbikes from "./components/dashboardComponents/Getrentbikes";
import Mycart from "./components/Mycart";
import Rentabike from "./components/Rentabike";
import Rentbikecart from "./components/Rentbikecart";
import Rentbikereviews from "./components/Rentbikereviews";
import Signout from "./components/Signout";
import ExploreRentBike from "./components/ExploreRentBike";


import {initialState, reducer} from "../src/reducer/UseReducer"
import {adminInitialState, adminreducer} from "../src/reducer/UseReducerAdmin"




export const UserContext = createContext();
export const AdminContext = createContext();

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [adminState, dispatchadmin] = useReducer(adminreducer, adminInitialState)

  
  return (
    <>

      <UserContext.Provider value={{state, dispatch}}>
      <Routes>
        <Route exact path="/" element={<Home />}> </Route>      
        <Route path="signin" element={<Signin/>}> </Route>
        <Route path="/signup" element={<Signup/>} ></Route>
        <Route path="/signout" element={<Signout/>}> </Route>
        <Route path="/mycart" element={ <Mycart/>}> </Route>
        <Route path="/rentbike" element={<Rentabike/> } ></Route>
        <Route path="/rentbikecart" element={<Rentbikecart/>}> </Route>
        <Route path="/rentbikereviews" element={<Rentbikereviews/>}> </Route>
        <Route path="/exploreRentBikes" element={ <ExploreRentBike/>}> </Route>
      </Routes>
      </UserContext.Provider>

      <AdminContext.Provider value={{adminState, dispatchadmin}}>
      <Routes>
        <Route path="/adminsignin" element={<AdminSignin/>}> </Route>
        <Route path="/adminsignout" element={<AdminSignout/>}> </Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/addbikes" element={<Addbikes/>}> </Route>
        <Route path="/rentbikesreports" element={<Rentbikereports/>}> </Route>
        <Route path="/availableusers" element={<Availableusers/>}> </Route>
        <Route path="/getrentbikesforadmin" element={<Getrentbikes/>}> </Route>
      </Routes>
      </AdminContext.Provider>   
    
    </>
  );


}

export default App;
