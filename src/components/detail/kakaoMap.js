import { Map, MapMarker } from "react-kakao-maps-sdk";

const kakaoMap = ({lat, lng}) => {

    return (
        <Map
          center={{ lat: lat, lng: lng }}
          style={{ width: "800px", height: "400px" }}
        >
          <MapMarker position={{ lat: lat, lng: lng }}>
          </MapMarker>
        </Map>
    )
}

export default kakaoMap;