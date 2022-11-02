import React, {lazy} from 'react';

const ProfileContainer = lazy(() => import('../components/Profile/ProfileContainer'));
const Dialogs = lazy(() => import('../components/Dialogs/Dialogs'));
const UsersContainer = lazy(() => import('../components/Users/Users'));
const News = lazy(() => import('../components/News/News'));
const Music = lazy(() => import('../components/Music/Music'));
const Settings = lazy(() => import('../components/Settings/Settings'));
const Login = lazy(() => import('../components/Login/Login'));

export interface IRoute {
    path: string;
    element: React.FC;
}

export enum RouteNames {
    LOGIN = '/login',
    PROFILE = '/profile/:userId',
    DIALOGS = '/dialogs/*',
    USERS = '/users',
    NEWS = '/news',
    MUSIC = '/music',
    SETTING = '/settings',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, element: Login},
];

export const privateRoutes: IRoute[] = [
    {path: RouteNames.PROFILE, element: ProfileContainer},
    {path: RouteNames.DIALOGS, element: Dialogs},
    {path: RouteNames.USERS, element: UsersContainer},
    {path: RouteNames.NEWS, element: News},
    {path: RouteNames.MUSIC, element: Music},
    {path: RouteNames.SETTING, element: Settings},
];