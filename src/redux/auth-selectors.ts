import {createSelector} from "reselect";
import {RootState} from "./reduxStore";

const getIsAuthSelector = (state: RootState) => {
    return state.auth.isAuth
}

export const getIsAuth = createSelector(getIsAuthSelector, (isAuth) => {
    return isAuth
})