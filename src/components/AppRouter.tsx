import React, {Suspense, useEffect, useState} from 'react';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Preloader from '../UI/Preloader/Preloader';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../store/store';
import {privateRoutes, publicRoutes} from '../routes';
import {getAuthUserData} from '../store/authReducer';

const AppRouter = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const myId = useAppSelector(state => state.auth.id);
    const dispatch = useAppDispatch();
    const [initialized, setInitialized] = useState(false);

    const initializedApp = async () => {
        await dispatch(getAuthUserData());
        setInitialized(true);
    };

    useEffect(() => {
        initializedApp();
    }, []);

    return (
        <div className="app">
            <Header/>
            <div className="app-wrapper">
                <Navbar/>
                <div className="app-wrapper-content">
                    {!initialized ?
                        <Preloader/> :
                        <Suspense fallback={<Preloader/>}>
                            {isAuth
                                ? <Routes>
                                    {privateRoutes.map(route =>
                                        <Route key={route.path} path={route.path} element={<route.element/>}/>
                                    )}
                                    <Route path="/*" element={<Navigate to={`/profile/${myId}`}/>}/>
                                </Routes>
                                : <Routes>
                                    {publicRoutes.map(route =>
                                        <Route key={route.path} path={route.path} element={<route.element/>}/>
                                    )}
                                    <Route path="/*" element={<Navigate to={`/login`}/>}/>
                                </Routes>
                            }
                        </Suspense>
                    }
                </div>
            </div>
        </div>
    );
};

export default AppRouter;