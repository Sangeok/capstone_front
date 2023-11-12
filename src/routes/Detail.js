import { useLocation, Link} from "react-router-dom";
import {useEffect, useState}  from "react";
import styles from "../styles/Detail.module.css";
import KakaoRoadView from "../components/detail/kakaoRoadView";
import KakaoMap from "../components/detail/kakaoMap";

import axios from "axios";

import { silverDataAtom } from "../recoil/silverDataAtom.js";
import { useRecoilState } from "recoil";

// 요양시설 상세 페이지.
function Detail() {
    // 각각의 상세 페이지에 넘어온 state를 가져오기 위해 uselocation을 사용.
    const location = useLocation();
    let data = location.state.item;
    const [relateData, setRelateData] = useState([]);
    const [silverData, serSilverData] = useRecoilState(silverDataAtom);

    useEffect(() => {
        console.log("hihi")
        axios.get(`http://localhost:8080/relate1?original_hospital=${data.name}`)
        .then(res => {
            setRelateData(res.data.newList);
        })
        .catch(error => console.log(error))
    }, []);

    return (
        <div className={styles.detail__container}>
            {console.log(data)}
            <div className={styles.detail__none}/>
            <div className={styles.detail__content}>
                <div className={styles.detail__wrapper}>
                    <div style={{ fontWeight: "700", fontSize: "xx-large", padding: "1%"}}>거리뷰</div>
                    <KakaoRoadView lat={data.ypos} lng={data.xpos}/>
                    <hr className={styles.detail__hr}/>
                    <ul className={styles.detail__ul}>
                        <li style={{ fontWeight: "700", fontSize: "xx-large"}}>
                            {data.name}
                        </li>
                        <li style={{ fontWeight: "100"}}>
                            주소 : {data.location}
                        </li>
                        <li style={{ fontWeight: "100"}}>
                            전화번호 : {data.phonenumber}
                        </li>
                        <li>
                            진료과목 : {data.category}
                        </li>
                    </ul>
                    <hr className={styles.detail__hr}/>
                    <div style={{ fontWeight: "700", fontSize: "xx-large", padding: "1%"}}>위치</div>
                    <KakaoMap lat={data.ypos} lng={data.xpos}/>
                    <hr className={styles.detail__hr}/>
                    <div className={styles.detail__relate}>
                        <div style={{ fontWeight: "700", fontSize: "xx-large", padding: "1%"}}>이 요양 시설은 어떠세요?</div>
                        <div className={styles.detail__relateContent}>
                            <ul>
                                {
                                    relateData.map((item,index)=>{
                                        let findSilver = silverData.find((silver)=>silver.id===item.recommended_id)
                                        return(
                                            <div className={styles.detail__relateMap}>
                                                <Link style={{textDecorationLine : "none"}}to={`/detail/${item.recommended_id}`} state={{item : findSilver}}><strong>{item.recommended_hospital}</strong></Link>
                                                { (index !== 4) && <h2 style={{display:"inline", paddingRight: "16px", paddingLeft: "16px"}}>|</h2> }
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;