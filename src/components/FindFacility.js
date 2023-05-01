// modal
import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../store.js"; 

import styles from "../styles/FindFacility.module.css";

import SearchFacility from "./SearchFacility.js";

// 이게 있어야 modal로 뜸
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function FindFacility() {

    // BIZPLC_NM : API 병원 이름
    const [hospitals, setHospitals] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        fetch("https://openapi.gg.go.kr/RecuperationHospital?KEY=e773163cf73d429b81008f1c8b081444&Type=json")
        .then((response)=>response.json())
        .then((json)=>{
            setHospitals(json.RecuperationHospital[1].row);
        });
    },[])

    const searched = hospitals.filter((item)=>
        item.BIZPLC_NM.includes(search)
    );

    const onChange = (event) => {
        setSearch(event.target.value); // 입력값을 전부 소문자로 생각
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
        {
            console.log(hospitals)
        }
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
                <div className = {styles.search__result}>
                    {
                        // search라는 state에 무언가 입력되지 않으면 아무것도 보이지 않음. 무언가 입력이 되었다면 그때 병원을 찾아서 사용자에게 보여줌.
                        search ? (
                        searched.map((item)=>{
                            return (
                                <>
                                    <li>
                                        {item.BIZPLC_NM}
                                    </li>
                                </>
                            )
                        })
                        ) :
                        null
                    }
                </div>

            
        </Modal>
        </>
    );
}

export default FindFacility;