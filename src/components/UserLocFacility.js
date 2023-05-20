import {useEffect, useState} from "react";
import styles from "../styles/UserLocFacility.module.css"

function UserLocFacility({regionOne, regionTwo, userLocationTwo, lat, lng}) {
    const [hospitals, setHospitals] = useState([]);
    const [newHospitals, setNewHospitals] = useState([]);
    const [searchLoc, setSearchLoc] = useState({});

    // hospitals에 병원API 정보를 넣음.
    useEffect(()=>{
        fetch('https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?serviceKey=jxwOJdF3W7dg4P7he9%2F2hwaPwgDszkbSReBLZF6tdG55G%2BcZQflK6SsRbR%2BioSWMeADf0A3vKKiSAm3JgWUU4A%3D%3D&pageNo=1&numOfRows=100&sidoCd=310000&zipCd=2040&clCd=28&_type=json')
        .then((response)=>response.json())
        .then((json)=>{
            setHospitals(json.response.body.items.item);
        });
    },[])

    // hospitals에 값이 입력되었을 때마다 실행
    useEffect(()=> {
        if(hospitals != null) {
        const newHos = hospitals.map((item) => {
            console.log("getDistance : " + item.YPos) // 각 요소 확인(여기서 item.PosY가 값이 없음.)
            return {
              ...item,
              distance: getDistance(lat, lng, item.YPos, item.XPos),
            };
          });
    
        // 사용자 기준 거리순으로 정렬 후 state에 저장
        newHos.sort(compareByDistance);
        setNewHospitals(newHos);
        }
    },[hospitals])

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

    const compareByDistance = (a,b) => 
        a.distance - b.distance;
    
    // const newHospitals = hospitals.map((item)=> ({
    //     ...item,
    //     distance : getDistance(lat, lng, item.PosY, item.PosX),
    // }))

    // 만약 userLocationTwo에 값이 있다면 우선적으로 보여줘야함.
    const searchedLoc = newHospitals.filter((res)=>
        res.addr.includes(regionTwo)
    );

    const searchedDistance = () => {
        const selectForDistance = searchLoc.filter((res)=>
            console.log(getDistance(lat, lng, res.PosY, res.PosX))
        );
    };

    // searchedLoc에 저장된 값에 대해서 해당 값들의 

    // const distanceLoc = () => {
    //     hospitals.XPos
    //     hospitals.YPos
    // }
    
    return (
        
        <div>
            {
                console.log("newHospitals : " + JSON.stringify(newHospitals))
            }
            {
                regionTwo && (
                    // 해당 결과가 여러개일 경우, 상단에 존재하는 5개의 결과물만 보여주도록 함.
                    searchedLoc.map((item, index)=>{
                        // let distance = getDistance(item.YPos, item.XPos, lat, lng);
                        if(index < 5) {
                            return (
                                <>
                                    <div className={styles.userLoc__content}>
                                        <ul>
                                            <li>
                                                거리 : {item.distance}
                                                <br/>
                                                시설 종류 : {item.clCdNm}
                                                <br/>
                                                시설 이름 : {item.yadmNm}
                                                <br/>
                                                주소 : {item.addr}
                                                <br/>
                                                <a href ="https://github.com/boomaye36/capstone_project">자세히 보기...</a>
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