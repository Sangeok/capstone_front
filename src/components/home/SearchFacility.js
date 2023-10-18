// modal

import axios from "axios";

import { Link } from "react-router-dom";

import {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';

import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../../store.js"; 

import styles from "../../styles/SearchFacility.module.css";

// 이게 있어야 modal로 뜸
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Paging.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { silverDataAtom } from "../../recoil/silverDataAtom.js";
import { useRecoilState } from "recoil";
import Pagination from "react-js-pagination";


function FindFacility() {
    const limit = 3;
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const [silverData, serSilverData] = useRecoilState(silverDataAtom);

    const searched = silverData.filter((item)=>
        item.name.includes(search)
    );

    const onChange = (event) => {
        setSearch(event.target.value); // 입력값을 전부 소문자로 생각
        setPage(1);
    }

    let dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const handleClose = (e) => {
        dispatch(changeState());
    }

    const handlePageChange = (page) => {
        setPage(page);
    };

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
                <div className = {styles.search__content}>
                    <div className = {styles.search__result}>
                        {
                            // search라는 state에 무언가 입력되지 않으면 아무것도 보이지 않음. 무언가 입력이 되었다면 그때 병원을 찾아서 사용자에게 보여줌.
                            search ? (
                            // 해당 결과가 여러개일 경우, 상단에 존재하는 3개의 결과물만 보여주도록 함.
                            searched.slice(offset, offset + limit).map((item, index)=>{
                                if(index < 3) {
                                    return (
                                        <>
                                            <ul>
                                                <li>
                                                    시설 이름 : {item.name}
                                                    <br/>
                                                    주소 : {item.location}
                                                    <br/>
                                                    전화번호 : {item.phonenumber}
                                                    <br/>
                                                    진료과목 : {item.category}
                                                    <br/>
                                                    <Link to={`/detail/${item.id}`}
                                                    state={{item : item}}>자세히보기...</Link>
                                                </li>
                                            </ul>
                                        </>
                                    )
                                }
                            })
                            ) :
                            null
                        }
                    </div>
                    {
                        search && <div className = {styles.search__footer}>
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={3}
                                totalItemsCount={searched.length}
                                pageRangeDisplayed={5}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={handlePageChange}
                            />
                        </div>
                    }
                </div>

            
        </Modal>
        </>
    );
}

export default FindFacility;