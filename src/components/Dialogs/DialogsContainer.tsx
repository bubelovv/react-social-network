import React from 'react';
import {actions, DialogType, MessageType} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {RootState} from "../../redux/reduxStore";

interface MapStateProps {
    dialogs: DialogType[]
    messages: MessageType[]
}

interface MapDispatchProps {
    addMessage: (newMessageText: string) => void
}

const mapStateToProps = (state: RootState): MapStateProps => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
};

export default compose(
    connect<MapStateProps, MapDispatchProps, {}, RootState>(mapStateToProps, {
        addMessage: actions.addMessage
    }),
    // withAuthRedirect,
)(Dialogs)