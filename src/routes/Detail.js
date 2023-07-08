import { useLocation } from "react-router-dom";
import styles from "../styles/Detail.module.css";

// 요양시설 상세 페이지.
function Detail() {
    // 각각의 상세 페이지에 넘어온 state를 가져오기 위해 uselocation을 사용.
    const location = useLocation();
    const data = location.state.item;
    return (
        <div className={styles.detail__container}>
            <div className={styles.detail__none}/>
            <div>
                <ul>
                    <li>
                        이름 : {data.yadmNm}
                    </li>
                    <li>
                        주소 : {data.addr}
                    </li>
                    <li>
                        전화번호 : {data.telno}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Detail;