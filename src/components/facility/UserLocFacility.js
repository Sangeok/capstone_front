import {useEffect, useState} from "react";
import styles from "../../styles/UserLocFacility.module.css"
import { Link } from "react-router-dom";
import Loading from "../loading";

import { silverDataAtom } from "../../recoil/silverDataAtom.js";
import { useRecoilState } from "recoil";

function UserLocFacility({regionOne, regionTwo, userLocationTwo, lat, lng}) {
    const [newHospitals, setNewHospitals] = useState([]);
    const [searchLoc, setSearchLoc] = useState({});
    const [loading, setLoading] = useState(true);

    const [silverData, serSilverData] = useRecoilState(silverDataAtom);
    

    // hospitals에 값이 입력되었을 때마다 실행
    useEffect(()=> {
        const newHos = silverData.map((item) => {
            return {
             ...item,
             distance: getDistance(lat, lng, item.ypos, item.xpos),
           };
         });
    
           // 사용자 기준 거리순으로 정렬 후 state에 저장
            newHos.sort(compareByDistance);
            setNewHospitals(newHos);
            setLoading(false);
            console.log(silverData);
    },[])


    // 위도 경도에 대해 2가지 장소가 정해졌을때, 직선거리를 구하는 함수
    function getDistance(lat1, lon1, lat2, lon2) {
        if ((lat1 == lat2) && (lon1 == lon2))
            return 0;
    
        var radLat1 = Math.PI * lat1 / 180;
        var radLat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radTheta = Math.PI * theta / 180;
        var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (dist > 1)
            dist = 1;
    
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515 * 1.609344 * 1000;
        if (dist < 100) dist = Math.round(dist / 10) * 10;
        else dist = Math.round(dist / 100) * 100;
    
        return dist;
    }

    // distance 거리 순으로 오름차순
    const compareByDistance = (a,b) => 
        a.distance - b.distance;

    // 만약 userLocationTwo에 값이 있다면 우선적으로 보여줘야함.
    const searchedLoc = newHospitals.filter((res)=>
        res.location.includes(regionTwo)
    );
    
    return (
        <div className={styles.userLoc__container}>
            {
                loading ? ( <div className={styles.userLoc__loading}><Loading/></div> )
                : (
                    // 해당 결과가 여러개일 경우, 상단에 존재하는 5개의 결과물만 보여주도록 함.
                    searchedLoc.map((item, index)=>{
                        if(index < 5) {
                            return (
                                <>
                                    <div className={styles.userLoc__content}>
                                    <div className={styles.userLoc__number}>{index+1}</div>
                                        <ul>
                                            <li>
                                                시설 이름 : {item.name}
                                                <br/>
                                                주소 : {item.location}
                                                <br/>
                                                전화번호 : {item.phonenumber}
                                                <br/>
                                                진료 과목 : {item.category}
                                                <br/>
                                                {/* postNo라는 id 개념의 속성을 통해 detail page를 만듬. */}
                                                <Link to={`/detail/${item.id}`}
                                                state={{item : item}}>자세히보기...</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )
                        }
                    })
                )
            }
        </div>
    )
}

export default UserLocFacility;