import React, {ReactNode} from 'react';

interface IProps {
    isOpen: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    title: string;
    body: ReactNode;
    confirmButtonText: string;
    buttonColor: 'btn-primary' | 'btn-danger' | 'btn-success' | 'btn-secondary';
}

const Modal = ({ isOpen, handleClose, handleConfirm, title, body, confirmButtonText, buttonColor }: IProps) => {
    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {body}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Zrušit</button>
                        <button type="button" className={`btn ${buttonColor}`} onClick={handleConfirm}>
                            {confirmButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
