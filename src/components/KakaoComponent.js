import {useState, useEffect} from "react";
import {Map, MapMarker} from "react-kakao-maps-sdk";

function KakaoComponent() {
    const { kakao } = window;
	const [address, setAddress] = useState(); // 현재 좌표의 주소를 저장할 상태
	const [lat, setUserLat] = useState();
	const [lng, setUserLng] = useState();

    const getAddress = () => {
		const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
		const coord = new kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
        const callback = function (result, status) {
			if (status === kakao.maps.services.Status.OK) {
				setAddress(result[0].address);
                console.log("address : " + address);
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
				alert("위치정보 error");
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

	return (
		<>
			<Map center={{ lat: 37.5566803113882, lng: 126.904501286522 }} style={{ width: '800px', height: '600px' }} level={3}>
				<MapMarker position={{ lat: 37.5566803113882, lng: 126.904501286522 }} />
				<button onClick={getAddress}>현재 좌표의 주소 얻기</button>
			</Map>

			{address && (
				<div>
					현재 좌표의 주소는..
					<p>address_name: {address.address_name}</p>
					<p>region_1depth_name: {address.region_1depth_name}</p>
					<p>region_2depth_name: {address.region_2depth_name}</p>
					<p>region_3depth_name: {address.region_3depth_name}</p>
				</div>
			)}
		</>
	);
}

export default KakaoComponent;