import React from "react";
import s from '../ProfileInfo.module.css';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status,
    };

    activateEditMade = () => {
        this.setState({
            editMode: true,
        });
    };

    deactivateEditMade = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status)
    };

    changeStatus = (e) => {
        this.setState({
            status: e.currentTarget.value,
        });
    };

    componentDidUpdate(prevProps, prevState) {
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
                               onBlur={this.deactivateEditMade}
                               value={this.state.status}/>
                    </div> :
                    <div className={s.statusSpanWrap}>
                        <span onDoubleClick={this.activateEditMade}>
                            Status: {this.props.status || 'Enter your status'}
                        </span>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;