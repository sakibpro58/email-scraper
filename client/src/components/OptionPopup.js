import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

const OptionPopup = (props) => {
    const [state, setState] = useState({

    });

    useEffect(() => {

    }, []);

    return (
        <React.Fragment>
            <Modal show={true} onHide={props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Search Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="mx-0 row">
                                <div className="col-md-12">
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" checked={props.options.acceptRootUrlOnly}  onClick={(e) => { 
                                                    props.setOptions({...props.options, acceptRootUrlOnly: !props.options.acceptRootUrlOnly }) 
                                                }} /> Process Root Url Only <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-2">
                            <div className="mx-0 row">
                                <div className="col-md-12">
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <div className="form-check">
                                            <label class="form-check-label">
                                                <input type="radio" class="form-check-input" checked={props.options.searchStrength === 'deep'} name="searchStrength" value="deep" onClick={(e) => { props.setOptions({...props.options, searchStrength: e.target.value }) }}/> Deep Search <i class="input-helper"></i>
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <label class="form-check-label">
                                                <input type="radio" class="form-check-input" checked={props.options.searchStrength === 'quick'} name="searchStrength" value="quick" onClick={(e) => { props.setOptions({...props.options, searchStrength: e.target.value }) }}/> Quick Search <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default OptionPopup;