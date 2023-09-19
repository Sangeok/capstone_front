import { Roadview } from "react-kakao-maps-sdk"

const kakaoRoadView = ({lat, lng}) => {
    return (
        <Roadview
            position={{
            // 지도의 중심좌표
            lat: lat,
            lng: lng,
            radius: 50,
            }}
            // 지도의 크기
            style={{width: "800px", height: "400px",}}
        />
    )
}

export default kakaoRoadView;