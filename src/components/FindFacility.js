// modal
import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../store.js"; 

import styles from "../styles/FindFacility.module.css";

// 이게 있어야 modal로 뜸
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function FindFacility() {

    const [search, setSearch] = useState("");
    const onChange = (event) => {
        setSearch(event.target.value);
    }

    let dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const handleClose = (e) => {
        dispatch(changeState());
    }

    let showModal= useSelector((state)=> {return state.showModal.isOpen});

    return (
        <>

        <Modal
            show={showModal} 
            onHide={handleClose}
            // modal size조절
            size="lg"
            className={styles.modal}
        >
            
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    시설검색
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modal__body}>
                <form onSubmit={onSubmit}>
                    <div className={styles.search__box}>
                        <input
                            className={styles.search__input} 
                            type="text" 
                            value={search} 
                            onChange={onChange}
                            placeholder="시설이름을 입력하세요..."
                        />
                        <button className="search-btn" type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </div>
                </form>
                </Modal.Body>
                <ul>
                    <li>
                        결과1
                    </li>
                    <li>
                        결과2
                    </li>
                    <li>
                        결과3
                    </li>
                </ul>

            
        </Modal>
        </>
    );
}

export default FindFacility;