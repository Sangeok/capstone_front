import {React, useEffect, useState, memo} from "react";

import styles from "../styles/Home.module.css";
import styled from 'styled-components';

import image1 from "../backgroundImage/image1.jpg";
import image2 from "../backgroundImage/image2.jpg";
import image3 from "../backgroundImage/image3.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

// fade-in으로 img를 생성하기 위해 styled-components를 사용
const StyledImg = styled.img`
animation: fadein 3s;
-moz-animation: fadein 3s; /* Firefox */
-webkit-animation: fadein 3s; /* Safari and Chrome */
-o-animation: fadein 3s; /* Opera */
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-moz-keyframes fadein { /* Firefox */
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-webkit-keyframes fadein { /* Safari and Chrome */
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-o-keyframes fadein { /* Opera */
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`

const Home = () => {


    let imageArr = [image1,image2,image3];
    const [mainImage, setMainImage] = useState(image1);
    let [lastRandom, setLastRandom] = useState(0);

    useEffect(()=>{
        const randomImage = setInterval(()=>{
            let random = Math.floor(Math.random()*3);
            // 그 전에 나왔던 사진이 나오지 않도록 함
            while(random===lastRandom) {
                random = Math.floor(Math.random()*3);
            }
            setMainImage(imageArr[random]);
            setLastRandom(random);
        }, 20000)
        return () => clearInterval(randomImage);
    }, [imageArr])

    return (
        <div className={styles.home}>
            <div className ={styles.image__content}>
                <StyledImg src={mainImage} alt="backgroundImage error"/>
            </div>
            <div className={styles.content}>
                <div className={styles.main__content}>
                    <div>요양, 걱정마세요.</div>
                    <div>노후 요양을 책임져 드릴게요.</div>
                </div>
                <div/>
                <div/>
            </div>
            <div className={styles.footer}>
                <div className={styles.copy}>
                    COPYRIGHT 2023 BY SILVER ALL RIGHT RESERVED
                </div>
                <div className={styles.icon}>
                    <span><a href ="https://github.com/boomaye36/capstone_project"><FontAwesomeIcon icon={faGithub}/></a></span>
                    <span><a href ="https://www.dankook.ac.kr/web/kor"><FontAwesomeIcon icon={faGraduationCap}/></a></span>
                </div>
            </div>
        </div>
    );
}

// memo로 home을 감싸게 되어, store.js(redux)내에 존재하는 state가 변경되어도 불필요한 재렌더링을 하지 않는다.
export default memo(Home);