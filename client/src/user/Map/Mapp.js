import { React, useState } from 'react'

// /* global kakao*/

function Mapp() {

    const [state, setstate] = useState([])

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=a5db921fec072aefed1f9e56c2d97a13&autoload=false`;
    document.head.appendChild(script);



    //GeoLocation api 호출 성공시 실행할 함수
    function success(position) {
        let loca = localStorage.getItem("user_location");
        if (loca === null) {
            let dis = [];
            let arr = [{
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                time: position.timestamp
            }];
            localStorage.setItem("user_location", JSON.stringify(arr));
            localStorage.setItem("distance", dis);
        } else {
            loca = JSON.parse(loca);
            localStorage.setItem("user_location", JSON.stringify(loca.push(
                {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    time: position.timestamp
                })));

            setstate(loca);
            console.log(state)


        }
    }

    //에러시 함수 호출
    function error(err) {
        alert(`ERROR ${err.code} : ${err.message}`);
    }

    const option = {
        enableHighAccuracy: true,  //배터리를 더 사용하여 위치정보를 더 자세히 가져옴
        maximumAge: 0,             //0으로 설정해서 매번 최신 위치를 가져오도록 함
        timeout: Infinity             //위치정보를 가져올 수 있는 최대 시간
    }

    const getLocation = () => {                                                   //현재 위치 값 가져오는 함수
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, option);
        } else {
            alert("위치정보를 사용할 수 있는 기기가 아닙니다.")
        }
    }

    const timer = setInterval(() => {
        getLocation();
    }, 10000);

    const stop = () => {
        clearInterval(timer);
    }






    return (
        <div>
            <button onClick={stop}>종료</button>
        </div>
    )
}

export default Mapp
