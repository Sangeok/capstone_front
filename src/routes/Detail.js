import { useLocation } from "react-router-dom";
import styles from "../styles/Detail.module.css";
import KakaoRoadView from "../components/detail/kakaoRoadView";
import KakaoMap from "../components/detail/kakaoMap";

// 요양시설 상세 페이지.
function Detail() {
    // 각각의 상세 페이지에 넘어온 state를 가져오기 위해 uselocation을 사용.
    const location = useLocation();
    const data = location.state.item;

    return (
        <div className={styles.detail__container}>
            <div className={styles.detail__none}/>
            <div className={styles.detail__content}>
                <div className={styles.detail__wrapper}>
                    <div style={{ fontWeight: "700", fontSize: "xx-large", padding: "1%"}}>거리뷰</div>
                    <KakaoRoadView lat={data.YPos} lng={data.XPos}/>
                    <hr className={styles.detail__hr}/>
                    <ul className={styles.detail__ul}>
                        <li style={{ fontWeight: "700", fontSize: "xx-large"}}>
                            {/* 병원 명 */}
                            {data.yadmNm}
                        </li>
                        <li style={{ fontWeight: "100"}}>
                            주소 : {data.addr}
                        </li>
                        <li>
                            전화번호 : {data.telno}
                        </li>
                    </ul>
                    <hr className={styles.detail__hr}/>
                    <div style={{ fontWeight: "700", fontSize: "xx-large", padding: "1%"}}>위치</div>
                    <KakaoMap lat={data.YPos} lng={data.XPos}/>
                </div>
            </div>
        </div>
    )
}

export default Detail;