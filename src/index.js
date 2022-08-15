import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import state, {addMessage, addPost} from "./redux/state";
import reportWebVitals from './reportWebVitals'
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree = () => {
    root.render(
        <BrowserRouter>
            <React.StrictMode>
                <App state={state} addPost={addPost} addMessage={addMessage}/>
            </React.StrictMode>
        </BrowserRouter>
    )
}
rerenderEntireTree()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
