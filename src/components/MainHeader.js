import {useState, useEffect} from "react";
import styled from 'styled-components';
import styles from "../styles/MainHeader.module.css";
import {Link} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHospital } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from "react-redux";

import SearchFacility from "./SearchFacility";
import { changeState } from "../store.js"; 

const StyledLink = styled(Link)`
        color : black;
        font-weight : 800;
        text-decoration: none;
        
    `
    const style = {
        color : "black",
        fontWeight : "800",
        cursor: "pointer",
    }
    
function MainHeader() {

    // store.js로 요청을 보냄.
    let dispatch = useDispatch();
    let showModal= useSelector((state)=> {return state.showModal});

    return (
        <div className={styles.main__header}>
            <ul>
                <li>
                    <StyledLink to="/">Silver</StyledLink>
                </li>
            </ul>
            <ul>
                <li>
                    {/* 시설검색 버튼 클릭 시, redux내의 showModal이 true로 바뀌면서 home.js에서 Modal창을 띄움 */}
                    <div onClick={() =>
                        dispatch(changeState())
                        }style={style}><FontAwesomeIcon icon={faMagnifyingGlass}/> 시설검색</div>
                </li>
                <li>
                    {/* 문제 : 이렇게하면 고정된 header를 다시 클릭하면 상태가 변경됨... 즉 useEffect로 각 routes에서 dispatch를 하는 것이 좋아보임. */}
                    <StyledLink to="/facility"><FontAwesomeIcon icon={faHospital}/> 요양 시설찾기</StyledLink>
                </li>
                <li>
                    <StyledLink to="/auth"><FontAwesomeIcon icon={faUser}/> 로그인/회원가입</StyledLink>
                </li>
            </ul>
            {
                ( showModal && <SearchFacility/> )
            }
        </div>
    )
}

export default MainHeader;
