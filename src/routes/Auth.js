import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
// import { headerState } from "../store.js";


import styles from "../styles/Auth.module.css";

function Auth() {

    // let changeHeader = useSelector((state)=> {return state.changeHeader});


    // let dispatch = useDispatch();

    // useEffect(()=> {
    //     dispatch(headerState());
    //     console.log(changeHeader);
    // })

    return (
        <div className={styles.AuthClass}>
            <div className={styles.loginHeader}>
                <h4>Login</h4>
            </div>
        </div>
    )
}

export default Auth;