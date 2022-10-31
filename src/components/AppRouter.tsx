import React, {Suspense, useEffect, useState} from 'react';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Preloader from './Users/Preloader/Preloader';
import {Route, Routes} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../store/store';
import {privateRoutes, publicRoutes} from '../routes';
import {getAuthUserData} from '../store/authReducer';

const AppRouter = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth);
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
                {!initialized ?
                    <Preloader/> :
                    <div className="app-wrapper-content">
                        <Suspense fallback={<Preloader/>}>
                            {isAuth
                                ? <Routes>
                                    {privateRoutes.map(route =>
                                        <Route key={route.path} path={route.path} element={<route.element/>}/>
                                    )}
                                </Routes>
                                : <Routes>
                                    {publicRoutes.map(route =>
                                        <Route key={route.path} path={route.path} element={<route.element/>}/>
                                    )}
                                </Routes>
                            }
                        </Suspense>
                    </div>
                }
            </div>
        </div>
    );
};

export default AppRouter;