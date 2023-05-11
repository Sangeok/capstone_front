import {useEffect, useState} from "react";

function UserLocFacility({regionOne, regionTwo, userLocationTwo}) {
    const [hospitals, setHospitals] = useState([]);

    // hospitals에 병원API 정보를 넣음.
    useEffect(()=>{
        fetch('https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?serviceKey=jxwOJdF3W7dg4P7he9%2F2hwaPwgDszkbSReBLZF6tdG55G%2BcZQflK6SsRbR%2BioSWMeADf0A3vKKiSAm3JgWUU4A%3D%3D&pageNo=1&numOfRows=100&sidoCd=310000&zipCd=2040&clCd=28&_type=json')
        .then((response)=>response.json())
        .then((json)=>{
            console.log(json.response.body.items.item);
            setHospitals(json.response.body.items.item);
        });
    },[])

    //만약 userLocationTwo에 값이 있다면 우선적으로 보여줘야함.
    const searchedLoc = hospitals.filter((res)=>
        res.addr.includes(regionTwo)
    );
    
    return (
        
        <div>
            {
                regionTwo && (
                    // 해당 결과가 여러개일 경우, 상단에 존재하는 5개의 결과물만 보여주도록 함.
                    searchedLoc.map((item, index)=>{
                        if(index < 5) {
                            return (
                                <>
                                    <ul>
                                        <li>
                                            시설 종류 : {item.clCdNm}
                                            <br/>
                                            시설 이름 : {item.yadmNm}
                                            <br/>
                                            주소 : {item.addr}
                                            <br/>
                                            <a href ="https://github.com/boomaye36/capstone_project">자세히 보기...</a>
                                        </li>
                                    </ul>
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