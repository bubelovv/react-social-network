import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Music from "./components/Music/Music";
import News from "./components/News/News";
import {Routes, Route} from "react-router-dom";
import Settings from "./components/Settings/Settings";

function App(props) {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar sidebar={props.store.getState().sidebar}/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path='/profile' element={<Profile store={props.store}/>}/>
                    <Route path='/messages/*' element={<DialogsContainer store={props.store}/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                </Routes>
            </div>
        </div>)
}

export default App;
