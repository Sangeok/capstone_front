import styled from 'styled-components';
import styles from "../styles/MainHeader.module.css";
import {Link} from "react-router-dom";



function MainHeader() {
    const StyledLink = styled(Link)`
        color : white;
        text-decoration: none;
        // link에 마우스 올릴 시 색깔 변경
        &:hover {
            color : 0d6efd;
        }
    `

    return (
        <div className={styles.main__header}>
            <ul>
                <li>
                    <StyledLink to="/">Logo</StyledLink>
                </li>
            </ul>
            <ul>
                <li>
                    <StyledLink to="/here">여기가자!</StyledLink>
                </li>
                <li>
                    <StyledLink to="/there">저기가자!</StyledLink>
                </li>
                <li>
                    <StyledLink to="/bestDetail">최고 명소</StyledLink>
                </li>
                <li>
                    <StyledLink to="/auth">로그인/회원가입</StyledLink>
                </li>
            </ul>
        </div>
    )
}

export default MainHeader;
