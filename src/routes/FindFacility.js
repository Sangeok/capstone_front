import {useState, useEffect, Component} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/FindFacility.module.css";
import styled from "styled-components";

import KakaoComponent from "../components/KakaoComponent.js"

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

// 현재 위치 기반으로 먼저 요양병원 시설을 찾아줌.
function FindFacility({accessToken}) {
    const navigate = useNavigate();
    // AcessToken이 4시간마다 변경되므로 사이트에서 계속 가져와야함...
    const [koreaOne, setKoreaOne] = useState([]);
    const [koreaTwo, setKoreaTwo] = useState([]);
    const [getCd, setGetCd] = useState();
    const [regionOne, setRegionOne] = useState("지역");
    const [regionTwo, setRegionTwo] = useState("시/군/구");

    const url1 = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${accessToken}`;
    const url2 = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${accessToken}&cd=${getCd}`;

    // 현재 내 위치정보 api(Js로 된 경도 위도 값이어야 하는지 혹은 저 api로만 가능한지는.. 추가로 확인해야함)
    //https://www.google.com/search?q=Geolocation+API+react&sxsrf=APwXEdct3TXu7Q9wbp4IvbdpSXLo4Tzm9g%3A1683382957602&ei=rWJWZLqbJJjt2roP4YiU0AQ&ved=0ahUKEwj6pdWZ8uD-AhWYtlYBHWEEBUoQ4dUDCA8&uact=5&oq=Geolocation+API+react&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyBAgAEB4yBAgAEB4yBggAEAUQHjIGCAAQCBAeOggIABAIEB4QCkoECEEYAFAAWJohYJQiaAVwAXgBgAHlAYgB6g6SAQYwLjEwLjGYAQCgAQKgAQHAAQE&sclient=gws-wiz-serp#fpstate=ive&vld=cid:d8b1e2a7,vid:bwrWkjM2xWw

    // 씨발 지금 문제 1. accessToken은 home에서 받아오는거라 FindFacility에서 새로고침하면 accessToken을 받아올 수 없음.
    //               2. 이에 대한 문제 => 만약 accessToken이 null이라면, home으로 돌아감.
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

    const checkAccessToken = () => {
        if(accessToken === undefined) {
            navigate("/");
        }
    }
    

    useEffect(()=>{
        checkAccessToken();
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
                                            <div className ={styles.koreaTwo}>
                                                <div onClick={()=>onClickValue(item,2)} key={item.cd}>{item.addr_name}</div>
                                            </div>
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
            <KakaoComponent/>
        </div>
    )
}

export default FindFacility;