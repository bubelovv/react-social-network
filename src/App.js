import React, {useEffect, Suspense, lazy} from 'react'
import './App.css'
import {HashRouter, Route, Routes} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import store from "./redux/reduxStore";

// --------- my custom components ---------
import Preloader from "./components/Users/Preloader/Preloader";
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
// ----------------------------------------

// ----------- lazy-components ------------
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const News = lazy(() => import('./components/News/News'));
const Music = lazy(() => import('./components/Music/Music'));
const Settings = lazy(() => import('./components/Settings/Settings'));
const Login = lazy(() => import('./components/Login/Login'));

// ----------------------------------------

export const App = ({initializeApp, initialized}) => {

    useEffect(() => {
        initializeApp()
    }, [])

    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            {!initialized ?
                <Preloader/> :
                <div className="app-wrapper-content">
                    <Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path={'/profile/:userId'} element={<ProfileContainer/>}/>
                            <Route path='/profile' element={<ProfileContainer/>}/>
                            <Route path='/' element={<ProfileContainer/>}/>
                            <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/news' element={<News/>}/>
                            <Route path='/music' element={<Music/>}/>
                            <Route path='/settings' element={<Settings/>}/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>
                    </Suspense>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({initialized: state.app.initialized})

const ConnectedApp = connect(mapStateToProps, {initializeApp})(App);

const MainApp = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <ConnectedApp/>
            </Provider>
        </HashRouter>
    )
}

export default MainApp