import React from 'react';
import Modal from 'react-bootstrap/Modal';
import loadingImage from '../assets/img/loader.gif';

const Loading = (props) => {
    return (
        <React.Fragment>
            <Modal show={true} centered>
                <Modal.Body className="mx-auto">
                    <img src={loadingImage} alt="Loading"/>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default Loading;