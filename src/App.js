import React from "react";
import './App.css';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import {Paper, Typography} from '@mui/material';

import LoginForm from "./Components/Admin/LoginForm";
import RoleSelector from "./RoleSelector";
//Implement Protected Route For the Components
import ProtectedRoute from './ProtectedRoute';
import AdminHome from "./Components/Admin/Home";
import User from './Components/Admin/User'
import Document from "./Components/Admin/Document";
import Group from "./Components/Admin/Group";


function App(){
    const isAuth = sessionStorage.getItem("isAuth");
    return(
    <>
    <Router>
        <Switch>
            <Route exact path='/' component={!isAuth ? RoleSelector : AdminHome}/>
            <Route exact path='/login/:role' component={!isAuth ? LoginForm : AdminHome}/>
            <ProtectedRoute path='/home' exact component={AdminHome} auth={isAuth}/>
            <ProtectedRoute path='/user' exact component={User} auth={isAuth}/>
            <ProtectedRoute path='/document' exact component={Document} auth={isAuth}/>
            <ProtectedRoute path='/group' exact component={Group} auth={isAuth}/>
        </Switch>
    </Router>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <Typography variant="body2" color="text.secondary" bgcolor='gray' align='center'>
            Copyright &copy; 2022, DEVX Pvt. Ltd.
        </Typography>
    </Paper>
    </>
    )
}

export default App;