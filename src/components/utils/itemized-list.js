import React from 'react';

import { RiDeleteBinLine } from "react-icons/ri";

class ItemizedList extends React.Component {
    render() {
        return (
            <div className="itemized-list" id={this.props.item} onClick={this.props.handleClick}>
            {this.props.item} <span>&nbsp;</span> <RiDeleteBinLine className="delete-logo"/>
            </div>
        )
    }
}

class ItemizedListExtended extends React.Component {
    render() {
        const listKeys = Object.keys(this.props.item);

        return (
            <div className="itemized-list-extended">
            {listKeys.map(key => {
                return (<div>{this.props.item[key]}<span>&nbsp;</span></div>)
            })}
            </div>
        )
    }
}

class ItemizedListNoDelete extends React.Component {
    render() {
        return (
            <div className="itemized-list-no-delete" id={this.props.item}>
                {this.props.item}
            </div>
        )
    }
}

export { ItemizedList, ItemizedListExtended, ItemizedListNoDelete };