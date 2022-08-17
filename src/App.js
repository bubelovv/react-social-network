import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import Dialogs from "./components/Dialogs/Dialogs";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import {Routes, Route} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import store from "./redux/state";

function App(props) {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar sidebar={props.store.getState().getSidebar()}/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path='/profile'
                           element={<Profile
                               store={store}
                               profilePage={props.store.getState().profilePage}
                               addPost={props.store.addPost.bind(props.store)}
                               updateNewPostText={props.store.updateNewPostText.bind(props.store)}/>}/>
                    <Route path='/messages/*'
                           element={<Dialogs
                               dialogsPage={props.store.getState().dialogsPage}
                               addMessage={props.store.addMessage}
                               updateNewMessageText={props.store.updateNewMessageText}/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                </Routes>
            </div>
        </div>)
}

export default App
