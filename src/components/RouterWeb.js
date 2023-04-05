import {Routes, Route} from "react-router-dom";
import MainHeader from "./MainHeader.js"
import Home from "../routes/Home.js"
import MyProfile from "../routes/MyProfile.js";
import Auth from "../routes/Auth.js";

function RouterWeb({isLoggedIn}) {
    return (
            <div>
                <MainHeader isLoggedIn={isLoggedIn}/>
                <Routes>
                    <>
                        
                        <Route path="/" element={<Home />}/>
                        {
                            isLoggedIn ? (
                                <>
                                    <Route path="/myprofile" element={<MyProfile/>}></Route>
                                </>
                            )
                            : (
                                <>
                                    <Route path="/auth" element={<Auth/>}></Route>
                                </>
                            )
                        }
                    </>
                </Routes>
            </div>
    )
}

export default RouterWeb;
