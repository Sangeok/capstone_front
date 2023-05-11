import {useState, useEffect, Component} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/FindFacility.module.css";
import styled from "styled-components";

import UserLocFacility from "../components/UserLocFacility.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";

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
function FindFacility({accessToken, userLocationOne ,userLocationTwo}) {
    const navigate = useNavigate();
    // AcessToken이 4시간마다 변경되므로 사이트에서 계속 가져와야함...
    const [koreaOne, setKoreaOne] = useState([]);
    const [koreaTwo, setKoreaTwo] = useState([]);
    const [getCd, setGetCd] = useState();
    const [regionOne, setRegionOne] = useState("지역");
    const [regionTwo, setRegionTwo] = useState("시/군/구");

    // const [locSearch, setLocSearch] = useState(false);

    const url1 = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${accessToken}`;
    const url2 = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${accessToken}&cd=${getCd}`;

    // 시/도 그리고 시/도에 대한 값을 가져왔다면 해당 시/군/구에 대한 정보를 가져오게할 API
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
            console.log(json);
            if(getCd === undefined) {
                setKoreaOne(json.result);
            }
            else {
                // KoreaTwo에는 addr_name(ex 안산시 단원구)에서 4번째 index까지만 저장하도록 함.
                let arr = [];
                for(var i = 0; i<json.result.length; i++) {
                    let str = json.result[i].addr_name;
                    let strSlice = str.slice(0,4);
                    // 공백 제거 후 arr에 push(공백이 문제를 일으킴.)
                    arr.push(strSlice.replace(/\s/g, ""));
                }
                // 중복 제거 array
                let uniqueArr = Array.from(new Set(arr));
                setKoreaTwo(uniqueArr);
            }
        }
        catch(error) {
            console.log('error' + error);
        }
    }

    const onClickValue = (item,number) => {
        // setLocSearch(false);
        if(number === 1) {
            setGetCd(item.cd);
            setRegionOne(item.addr_name);
        }
        else if(number === 2) {
            // 뒤에 구체적인 "구"까지 나오는 것에 대해 통일성을 부여하기 위해 4까지 자름.
            setRegionTwo(item);
        }

    }

    const checkUserLocation = () => {
        if(userLocationOne) {
            setRegionOne(userLocationOne);
            // 뒤에 구체적인 "구"까지 나오는 것에 대해 통일성을 부여하기 위해 4까지 자름.
            setRegionTwo(userLocationTwo.slice(0,4));
        }
    }

    const checkAccessToken = () => {
        if(accessToken === undefined) {
            navigate("/");
        }
    }

    // 사용자가 조회 버튼을 누르면 해당 정보가 하위 component에 전달됨.
    // const userSearch = () => {
    //     setLocSearch(true);
    // }
    

    useEffect(()=>{
        // 새로고침시, accessToken에 값이 안 들어옴. 즉 새로고침 누를 시 home으로 사용자가 갔다오게 해야함.
        checkAccessToken();
        getKoreaAddress();
    },[getCd])

    // 기본적으로 사용자의 위치정보 값을 default로 설정.
    useEffect(()=>{
        // 새로고침시, accessToken에 값이 안 들어옴. 즉 새로고침 누를 시 home으로 사용자가 갔다오게 해야함.
        checkAccessToken();
        checkUserLocation();
    }, [])

      
      

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
                                    koreaOne.map((item, index)=>{
                                        return (
                                            <>
                                                <div onClick={()=>onClickValue(item,1)} key={index}>{item.addr_name}</div>
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
                                    koreaTwo && koreaTwo.map((item, index)=>{
                                        return (
                                            <div className ={styles.koreaTwo}>
                                                <div onClick={()=>onClickValue(item,2)} key={index}>{item}</div>
                                            </div>
                                        )
                                    })    
                                }
                            </DropDownContent>
                        </DropDownContainer>
                    </li>
                    {/* <li>
                        <button onClick={userSearch}><FontAwesomeIcon icon={faMagnifyingGlassLocation}/> 조회</button>
                    </li> */}
                </ul>
            </div>

            <div className={styles.facility__content}>
                {
                    <UserLocFacility regionOne={regionOne} regionTwo={regionTwo} userLocationTwo={userLocationTwo}/>
                }
            </div>
        </div>
    )
}

export default FindFacility;