import {Routes, Route} from "react-router-dom";
import MainHeader from "./MainHeader.js"
import Home from "../routes/Home.js"

function RouterWeb({isLoggedIn}) {
    return (
            <div>
                <MainHeader isLoggedIn={isLoggedIn}/>
                <Routes>
                    <>
                        <Route path="/" element={<Home />}/>
                        {
                            // isLoggedIn ? (

                            // )
                            // : (

                            // )
                        }
                    </>
                </Routes>
            </div>
    )
}

export default RouterWeb;
