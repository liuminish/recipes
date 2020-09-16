import React from "react";
import './utils.css'

class Checkbox extends React.Component {
    render() {
        return (
        <div className="checkbox-container">
        <label>
            <input
                className="checkbox"
                type="checkbox"
                name={this.props.label}
                checked={this.props.isSelected}
                onChange={this.props.onCheckboxChange}
            />
            {this.props.label}
        </label>
        </div>
        )
    }
}

export default Checkbox;