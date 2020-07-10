import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";

const Home = lazy(() => import("./pages/Home"));

function App({history}) {
  return (
    <div className="App">
        <BrowserRouter>
            <Suspense fallback={<div>...Загрузка</div>}>
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
