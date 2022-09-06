import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom";
import Login from "./components/Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from "./components/Profile/ProfileContainer";
import MyProfileContainer from "./components/Profile/MyProfileContainer";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from "./components/Users/UsersContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

let App = () => {
    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                    <Route path='/profile' element={<MyProfileContainer />} />
                    <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                    <Route path='/users' element={<UsersContainer/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;
