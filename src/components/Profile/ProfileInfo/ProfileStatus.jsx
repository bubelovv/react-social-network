import React from "react";

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
            <div>
                {this.state.editMode ?
                    <div>
                        <input autoFocus={true}
                               onChange={this.changeStatus}
                               onBlur={this.deactivateEditMade}
                               value={this.state.status}/>
                    </div> :
                    <div>
                        <span onDoubleClick={this.activateEditMade}>
                            {this.props.status || 'Enter your status'}
                        </span>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;