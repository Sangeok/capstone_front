import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import MainHeader from "./MainHeader.js"
import Home from "../routes/Home.js"
import MyProfile from "../routes/MyProfile.js";
import Auth from "../routes/Auth.js";
import FindFacility from "../routes/FindFacility.js";

function RouterWeb({isLoggedIn}) {
    const [accessToken, setAccessToken] = useState();
    const [curLocation, setCurLocation] = useState({});
    const consumer__key = '1c08dccc70914d3bbde1';
    const consumer_secret = '8a0afa457e9a47ca9976';

    const getAccessToken = async() => {
        try {
            const response = await fetch(
                `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${consumer__key}&consumer_secret=${consumer_secret}`
            );
            const json = await response.json();
            setAccessToken(json.result.accessToken);

        }
        catch(error){
            console.log('error' + error);
        }
    }

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function(pos){
            console.log("postion : " + pos);
            var positionObJ = {
                latitude : pos.coords.latitude,
                longitude : pos.coords.longitude
            }
            setCurLocation(positionObJ);
        })
        getAccessToken();
    },[])


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
                        <Route path="/facility" element={<FindFacility accessToken={accessToken} curLocation={curLocation}/>}/>
                    </>
                </Routes>
            </div>
    )
}

export default RouterWeb;
