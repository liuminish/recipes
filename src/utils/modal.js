import React from 'react';
import './utils.css';

class Modal extends React.Component {
    render() {
        const modalDisplay = { display: this.props.displayModal ? "block" : "none" };
        return (
        <div className="modal-main" style={modalDisplay}>
            <div className="modal-background" />
            <div className="modal-content">
                <div className="modal-icon">{this.props.modalIcon}</div>
                <div className="modal-title">{this.props.modalTitle}</div>
                <div>{this.props.modalContent}</div>
                <div className="modal-button-ok" onClick={this.props.handleClose}>{this.props.modalButton}</div>
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
            <div className="modal-background" />
            <div className="modal-content">
                <div className="modal-icon">{this.props.modalIcon}</div>
                <div className="modal-title">{this.props.modalTitle}</div>
                <div>{this.props.modalContent}</div>
                <div className="modal-button-container">
                    <div className="modal-button-cancel" onClick={this.props.handleClose}>no</div>
                    <div className="modal-button-ok" onClick={this.props.handleOk}>yes</div>
                </div>
            </div>
        </div>
        );
    }
}

export { Modal, ModalExtended };