import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import loadingImage from '../assets/img/loader.gif';

const Loading = (props) => {
    const [state, setState] = useState({

    });

    useEffect(() => {

    }, []);

    return (
        <React.Fragment>
            <Modal show={true} centered>
                <Modal.Body className="mx-auto">
                    <img src={loadingImage} />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default Loading;