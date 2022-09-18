import React, {useEffect} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from './components/Login/Login';
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from "./components/Users/UsersContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/Users/Preloader/Preloader";

function App(props) {

    useEffect(() => {
        props.initializeApp()
    }, [])

    if (!props.initialized) {
        return <Preloader/>
    }

    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                    <Route path='/profile' element={<ProfileContainer />} />
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

const mapStateToProps = (state) => ({initialized: state.app.initialized})

export default connect(mapStateToProps, {initializeApp})(App);
