import styled from 'styled-components';
import styles from "../../styles/MainHeader.module.css";

import {Link} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHospital } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../../store.js"; 

import SearchFacility from "./SearchFacility";


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
                    <div onClick={() =>
                        dispatch(changeState())
                        }style={style}><FontAwesomeIcon icon={faMagnifyingGlass}/> 시설검색</div>
                </li>
                <li>
                    <StyledLink to="/facility"><FontAwesomeIcon icon={faHospital}/> 요양 시설찾기</StyledLink>
                </li>
            </ul>
            {
                ( showModal && <SearchFacility/> )
            }
        </div>
    )
}

export default MainHeader;
