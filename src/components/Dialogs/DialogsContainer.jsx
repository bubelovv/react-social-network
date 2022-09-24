import React from 'react';
import {addMessage} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
};

export default compose(
    connect(mapStateToProps, {addMessage}),
    withAuthRedirect,
)(Dialogs)