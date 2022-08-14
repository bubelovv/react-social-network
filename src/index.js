import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

let posts = [
    {id: 1, message: 'It\'s the last post', likesCount: 10},
    {id: 2, message: 'It\'s  the middle post', likesCount: 15},
    {id: 3, message: 'It\'s the first post', likesCount: 20},
];

let dialogs = [
    {id: '1', name: 'Bubelov'},
    {id: '2', name: 'Darinka'},
    {id: '3', name: 'Aleksey'},
    {id: '4', name: 'Manga'},
    {id: '5', name: 'Ilysha'},
];

let messages = [
    {id: '1', message: 'I will work in it-industry'},
    {id: '2', message: 'I wait you so much, Lubimka'},
    {id: '3', message: 'I do not know, we will in the ocean or not...'},
];

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages}/>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
