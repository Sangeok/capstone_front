import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import MainHeader from "./MainHeader.js"
import Home from "../routes/Home.js"
import MyProfile from "../routes/MyProfile.js";
import Auth from "../routes/Auth.js";
import FindFacility from "../routes/FindFacility.js";
import {Map, MapMarker} from "react-kakao-maps-sdk";

function RouterWeb({isLoggedIn}) {
    const { kakao } = window;
	const [address, setAddress] = useState({}); // 현재 좌표의 주소를 저장할 상태
	const [userLocationOne, setuserLocationOne] = useState();
	const [userLocationTwo, setuserLocationTwo] = useState();
	const [lat, setUserLat] = useState();
	const [lng, setUserLng] = useState();
    const [userWanstLocation , setuserWanstLocation] = useState(false);

    const [accessToken, setAccessToken] = useState();
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

    const getAddress = () => {
		const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
		const coord = new kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
        const callback = function (result, status) {
			if (status === kakao.maps.services.Status.OK) {
				setAddress(result[0].address);
			}
		};
		geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
	};

	const getlocation = () => {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos){
				setUserLat(pos.coords.latitude);
				setUserLng(pos.coords.longitude);
			},function(error) {
				// 사용자가 위치정보 제공을 거부
                setuserWanstLocation(true);
			}, {
				enableHighAccuracy : false,
				maximumAge : 0,
				timeout : 25000
			});
		}
		else {
			console.log("GPS 사용 X");
		}
	}

    useEffect(()=>{
		getlocation();
		if(lat !== undefined && lng !== undefined) {
			getAddress();
		}

    },[lat, lng])

	useEffect(()=>{
		if(address !== null) {
			setuserLocationOne(address.region_1depth_name);
			setuserLocationTwo(address.region_2depth_name);
		}
	},[address])

    useEffect(()=>{
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
                        
                        {/* 사용자의 시/도 && 시/군/구에 대한 정보가 있거나 혹은 애초에 위치정보 제공을 거부했을 시 요양시설 찾기에 route를 허용*/}
                        { (userLocationOne || userWanstLocation) && <Route path="/facility" element={<FindFacility accessToken={accessToken} userLocationOne={userLocationOne} userLocationTwo={userLocationTwo}/>}/> }
                    </>
                </Routes>
            </div>
    )
}

export default RouterWeb;
