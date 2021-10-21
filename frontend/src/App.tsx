import React, {useState} from 'react';
import './App.css';


//components
import AppHeader from "./Components/app-header/AppHeader";
import {useAppDispatch} from "./app/hooks";
import {getApiData} from "./Slicer/QuizSlice";
import {CssBaseline, Toolbar} from "@mui/material";
import MainView from "./Components/main-view/MainView";

function App() {
    const [token, setToken] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const dispatch = useAppDispatch();
    dispatch(getApiData());
    return (
        <React.Fragment>
            <CssBaseline/>
            <AppHeader />
            <Toolbar/>
            <MainView />

        </React.Fragment>
    );
}

export default App;
