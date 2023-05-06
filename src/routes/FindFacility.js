import {useState, useEffect} from "react";
import axios from "axios";
import styles from "../styles/FindFacility.module.css";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

//대한민국 전체 시/도에 대한 시/군/구
// https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=343a03e8-2f83-4042-a88e-d8f341fd4c0e& 시/도 => 시/군/구(cd값을 통해서..)
const DropDownContent = styled.div`
    display : none;
    position : absolute;
    z-index : 1;
    font-weight : 400;
    background-color: #f9f9f9;
    min-width : 150px;
    border-bottom : 40px;
`
DropDownContent.displayName = DropDownContent;

const DropDownContainer = styled.div`
    position : relative;

    &:hover ${DropDownContent} {
        display : block;
    }
`


function FindFacility({accessToken}) {
    // AcessToken이 4시간마다 변경되므로 사이트에서 계속 가져와야함...
    const [koreaOne, setKoreaOne] = useState([]);
    const [koreaTwo, setKoreaTwo] = useState([]);
    const [getCd, setGetCd] = useState();
    const [regionOne, setRegionOne] = useState("지역");
    const [regionTwo, setRegionTwo] = useState("시/군/구");

    const url1 = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${accessToken}`;
    const url2 = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${accessToken}&cd=${getCd}`

    const getKoreaAddress = async() => {
        let url;
        if(getCd === undefined) {
            url = url1;
        }
        else url = url2;

        try {
            const response = await fetch(
                url
            )
            const json = await response.json();
            console.log(json.result);
            if(getCd === undefined) {
                setKoreaOne(json.result);
            }
            else setKoreaTwo(json.result);
        }
        catch(error) {
            console.log('error' + error);
        }
    }

    const onClickValue = (item,number) => {
        if(number === 1) {
            setGetCd(item.cd);
            setRegionOne(item.addr_name);
        }
        else if(number === 2) {
            setRegionTwo(item.addr_name);
        }

    }

    useEffect(()=>{
        // 새로고침시, accessToken에 값이 안 들어옴. 즉 새로고침 누를 시 home으로 사용자가 갔다오게 해야함.
        getKoreaAddress();
    },[getCd])

      
      

    return (
        <div className ={styles.facility__content}>
            <div className = {styles.facility__none}/>

            <div className={styles.facility__header}>
                <ul>
                    <li>
                        <DropDownContainer>
                            <button><FontAwesomeIcon icon={faMap}/> { regionOne}</button>
                            <DropDownContent>
                                {
                                    koreaOne.map((item)=>{
                                        return (
                                            <>
                                                <div onClick={()=>onClickValue(item,1)} key={item.cd}>{item.addr_name}</div>
                                            </>
                                        )
                                    })    
                                }
                            </DropDownContent>
                        </DropDownContainer>
                    </li>
                    <li>
                        <DropDownContainer>
                        <button><FontAwesomeIcon icon={faMapLocationDot}/> { regionTwo}</button>
                        <DropDownContent>
                                {
                                    koreaTwo.map((item)=>{
                                        return (
                                            <>
                                                <div onClick={()=>onClickValue(item,2)} key={item.cd}>{item.addr_name}</div>
                                            </>
                                        )
                                    })    
                                }
                            </DropDownContent>
                        </DropDownContainer>
                    </li>
                    <li>
                        <button><FontAwesomeIcon icon={faMagnifyingGlassLocation}/> 조회</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FindFacility;