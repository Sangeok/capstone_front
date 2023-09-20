import { useLocation } from "react-router-dom";
import {useEffect}  from "react";
import styles from "../styles/Detail.module.css";
import KakaoRoadView from "../components/detail/kakaoRoadView";
import KakaoMap from "../components/detail/kakaoMap";

// 요양시설 상세 페이지.
function Detail() {
    useEffect(()=>{
        console.log("hihi")
    },[])

    // 각각의 상세 페이지에 넘어온 state를 가져오기 위해 uselocation을 사용.
    const location = useLocation();
    const data = location.state.item;

    return (
        <div className={styles.detail__container}>
            {
                console.log(data)
            }
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
                </div>
            </div>
        </div>
    )
}

export default Detail;