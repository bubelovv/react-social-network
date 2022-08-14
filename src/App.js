import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import Dialogs from "./components/Dialogs/Dialogs";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Settings from "./components/Settings/Settings";

function App(props) {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar state={props.state.sidebar}/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path='/profile'
                               element={<Profile state={props.state.profilePage}/>}/>
                        <Route path='/messages/*'
                               element={<Dialogs state={props.state.dialogsPage}/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                    </Routes>
 q                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
