import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Map.scss';

//const {kakao} = window;  //window 객체로부터 스크립트에서 로드한 api 가져와야 하므로

const Map = () => {
  const key = process.env.REACT_APP_MAP;

  const [loc, setLoc] = useState({
    latitude: 37.64320392668808,
    longitude: 127.10559364606934
  });

  //useEffect
  useEffect(() => {
    getLocation()
  }, []); //longitude

  const loadMap = (lat, lng) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
    document.head.appendChild(script)
    script.onload = () => {
      window.kakao.maps.load(() => {
          const container = document.getElementById('map')  //지도 담을 div

          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),  //지도 중심 X,Y좌표 정보를 가지고 있는 객체 생성
            level: 3,  //확대 수준, 작을수록 범위 좁아짐
          }

          const map = new window.kakao.maps.Map(container, options);  //지도 생성

          const makerPosition = new window.kakao.maps.LatLng(lat, lng);  //마커 위치
          const marker = new window.kakao.maps.Marker({   //마커 생성
              position: makerPosition,
            });
            marker.setMap(map)  // 마커를 지도 위에 표시
            console.log("fini")
        })
      }
  }

  //setState
  const setState = (coords) => {
    setLoc({
      ...loc,
      latitude: coords.latitude,
      longitude: coords.longitude})
  }

  //geolocation
  const getLocation = () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          function(error) {
            alert(error.message);
          },
          {
            enableHighAccuracy: true,  //높은 정확도
            maximumAge: 0,
            timeout: Infinity,
          },
        );
      }).then(async(coords) => {
        await setState(coords)
      }).then(() => {
          loadMap(loc.latitude, loc.longitude);
        }
      );
    }
    console.info('GPS를 지원하지 않습니다');
  }
  

  return (
    <div className="map">
      <div id='map'></div>
    </div>
  );
}

export default Map;