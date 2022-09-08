// import React from 'react';
import {sendMessage, updateNewMessageText} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
    }
};

export default compose(
    connect(mapStateToProps, {sendMessage, updateNewMessageText}),
    // withAuthRedirect,
)(Dialogs)