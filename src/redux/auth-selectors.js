import {createSelector} from "reselect";

const getIsAuthSelector = (state) => {
    return state.auth.isAuth
}

export const getIsAuth = createSelector(getIsAuthSelector, (isAuth) => {
    return isAuth
})