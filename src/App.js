import React, { Suspense} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";


function App({history}) {
  return (
    <div className="App">
        <BrowserRouter>
            <Suspense fallback={<div>...Загрузка</div>}>
                <Switch>
                    <Route path="/login" exact component={LoginForm}/>
                </Switch>
            </Suspense>
        </BrowserRouter>
    </div>
  );
}

export default App;
