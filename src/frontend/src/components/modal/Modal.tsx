import ReactDOM from 'react-dom';
import './modal.css'
export const Modal = ({
    show,
    onCloseButtonClick,
    children
}
    : {
        show: boolean,
        onCloseButtonClick: () => void,
        children?: JSX.Element
    }) => {
    if (!show) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="modal-wrapper">
            <div className="modal">
                <div className="header">
                    <button onClick={onCloseButtonClick}>&times;</button>
                </div>
                {children}

            </div>
        </div>
        , document.body
    );
};

export default Modal;