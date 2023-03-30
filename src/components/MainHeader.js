import {useState, useEffect} from "react";
import styled from 'styled-components';
import styles from "../styles/MainHeader.module.css";
import {Link} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHospital } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../store";

import FindFacility from "../components/FindFacility";
 

function MainHeader() {

    // store.js로 요청을 보냄.
    let dispatch = useDispatch();
    let showModal= useSelector((state)=> {return state.showModal});
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
                    <StyledLink to="/bestDetail"><FontAwesomeIcon icon={faHospital}/> 요양 시설찾기</StyledLink>
                </li>
                <li>
                    <StyledLink to="/auth"><FontAwesomeIcon icon={faUser}/> 로그인/회원가입</StyledLink>
                </li>
            </ul>
            {
                ( showModal && <FindFacility/> )
            }
        </div>
    )
}

export default MainHeader;
