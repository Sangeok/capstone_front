// modal
import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../store";

// 이게 있어야 modal로 뜸
import 'bootstrap/dist/css/bootstrap.min.css';

function FindFacility() {
    let dispatch = useDispatch();

    const handleClose = (e) => {
        dispatch(changeState());
    }
    
    let showModal= useSelector((state)=> {return state.showModal.isOpen});

    return (
        <>
            {/* <div>
                FindFacility;
            </div> */}
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default FindFacility;