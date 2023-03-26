import { ReactNode } from 'react';
import {createPortal} from 'react-dom';

import styles from './Modal.module.css';

interface ModalProps {
    onClose?: () => void;
    children?: ReactNode;
}

const Backdrop = (props: ModalProps) => {
    return (
        <div className={styles.backdrop} onClick={props.onClose}/>
    );
};

const ModalOverlay = (props: ModalProps) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays') as HTMLElement;

const Modal = (props: ModalProps) => {
    return (
        <>
            {createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    );
};

export default Modal;
