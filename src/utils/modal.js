import React from 'react';
import './utils.css';

class Modal extends React.Component {
    render() {
        const modalDisplay = { display: this.props.displayModal ? "block" : "none" };
        return (
        <div className="modal-main" style={modalDisplay}>
            <div className="modal-content">
                <p>{this.props.modalContent}</p>
                <p><button onClick={this.props.handleClose}>okay</button></p>
            </div>
        </div>
        );
    }
}

class ModalExtended extends React.Component {
    render() {
        const modalDisplay = { display: this.props.displayModal ? "block" : "none" };
        return (
        <div className="modal-main" style={modalDisplay}>
            <div className="modal-content">
                <p>{this.props.modalContent}</p>
                <p><button onClick={this.props.handleClose}>close</button></p>
            </div>
        </div>
        );
    }
}

export { Modal, ModalExtended };