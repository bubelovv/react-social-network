import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
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
    };

    render() {
        return (
            <div>
                {this.state.editMode ?
                    <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMade} value={this.props.status}/>
                    </div> :
                    <div>
                        <span onDoubleClick={this.activateEditMade}> {this.props.status} </span>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;