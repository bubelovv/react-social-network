import React from "react";
import s from '../ProfileInfo.module.css';

type Props = {
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
}

type State = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<Props, State> {
    state = {
        editMode: false,
        status: this.props.status,
    };

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status)
    };

    changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        });
    };

    componentDidUpdate(prevProps: Props, prevState: State) {
        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status});
        }
    };

    render() {
        return (
            <div className={s.statusWrap}>
                {this.state.editMode ?
                    <div className={s.statusInputWrap}>
                        <span>Status:</span>
                        <input autoFocus={true}
                               onChange={this.changeStatus}
                               onBlur={this.deactivateEditMode}
                               value={this.state.status}/>
                    </div> :
                    <div className={s.statusSpanWrap}>
                        <span onDoubleClick={this.activateEditMode}>
                            Status: {this.props.status || 'Enter your status'}
                        </span>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;