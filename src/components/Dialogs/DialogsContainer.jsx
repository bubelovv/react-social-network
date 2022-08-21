import React from 'react';
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
    }
};

const mapStateToDispatch = (dispatch) => {
    return {
        sendMessage: () => dispatch(sendMessageActionCreator()),
        updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextActionCreator(text))
        },
    }
};

const DialogsContainer = connect(mapStateToProps, mapStateToDispatch)(Dialogs);

export default DialogsContainer;