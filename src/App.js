import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import Home from "./pages/Home";
import './App.css';

const LoginForm = lazy(() => import("./Components/LoginForm/LoginForm"));
const progressStyle = {height: "100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems: "center"};

function App({history}) {
  return (
    <div className="App">
        <BrowserRouter>
            <Suspense fallback={<div style={progressStyle}><CircularProgress/></div>}>
                <Switch>
                    <Route path="/login" exact history={history} component={LoginForm}/>
                    <Route path="/" exact history={history} component={Home}/>
                </Switch>
            </Suspense>
        </BrowserRouter>
    </div>
  );
}

export default App;
